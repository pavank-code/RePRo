// Gemini API integration
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENHANCER_SYSTEM_PROMPT, createEnhancementRequest } from '../utils/enhancer-prompt';

const MODELS = {
    flash: 'gemini-2.0-flash',
    flashLite: 'gemini-2.0-flash-lite',
    pro: 'gemini-2.0-pro-exp',
};

// Parse rate limit error to extract retry delay
function parseRateLimitError(error: Error): { isRateLimit: boolean; retryAfter?: number } {
    const message = error.message || '';
    if (message.includes('429') || message.includes('quota') || message.includes('rate')) {
        // Try to extract retry delay from error message
        const retryMatch = message.match(/retry in (\d+)/i);
        const retryAfter = retryMatch ? parseInt(retryMatch[1], 10) : 60;
        return { isRateLimit: true, retryAfter };
    }
    return { isRateLimit: false };
}

export async function enhanceWithGemini(
    apiKey: string,
    rawPrompt: string,
    model: string = MODELS.flash,
    onStream?: (chunk: string) => void
): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Try primary model, fallback to alternatives on error
    const modelsToTry = [model, MODELS.flash, MODELS.flashLite].filter((m, i, arr) => arr.indexOf(m) === i);

    let lastError: Error | null = null;

    for (const modelName of modelsToTry) {
        try {
            const generativeModel = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: ENHANCER_SYSTEM_PROMPT,
            });

            const userMessage = createEnhancementRequest(rawPrompt);

            if (onStream) {
                // Streaming response
                const result = await generativeModel.generateContentStream(userMessage);
                let fullResponse = '';

                for await (const chunk of result.stream) {
                    const text = chunk.text();
                    fullResponse += text;
                    onStream(fullResponse);
                }

                return fullResponse;
            } else {
                // Non-streaming response
                const result = await generativeModel.generateContent(userMessage);
                const response = result.response;
                return response.text();
            }
        } catch (error) {
            lastError = error as Error;
            const { isRateLimit, retryAfter } = parseRateLimitError(lastError);

            if (isRateLimit) {
                // Don't retry on rate limit - throw immediately with helpful message
                throw new Error(
                    `Gemini API rate limit exceeded. ` +
                    `Try again in ${retryAfter} seconds, or switch to OpenRouter in Settings (it has free models too!)`
                );
            }

            console.warn(`Model ${modelName} failed, trying next...`, error);
            continue;
        }
    }

    throw lastError || new Error('All models failed');
}

export const GEMINI_MODELS = [
    { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (Recommended)' },
    { value: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite (Faster)' },
    { value: 'gemini-2.0-pro-exp', label: 'Gemini 2.0 Pro (Powerful)' },
];

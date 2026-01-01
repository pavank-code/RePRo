// OpenRouter API integration
import { ENHANCER_SYSTEM_PROMPT, createEnhancementRequest } from '../utils/enhancer-prompt';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// List of free models to try in order (fallback chain)
const FREE_MODELS = [
    'meta-llama/llama-4-maverick:free',
    'deepseek/deepseek-chat-v3-0324:free',
    'mistralai/mistral-small-3.1-24b-instruct:free',
    'google/gemini-2.5-pro-exp-03-25:free',
    'nvidia/llama-3.1-nemotron-nano-8b-v1:free',
    'qwen/qwen2.5-vl-3b-instruct:free',
];

export async function enhanceWithOpenRouter(
    apiKey: string,
    rawPrompt: string,
    model: string = FREE_MODELS[0],
    onStream?: (chunk: string) => void
): Promise<string> {
    const userMessage = createEnhancementRequest(rawPrompt);

    // Build list of models to try (selected model first, then fallbacks)
    const modelsToTry = [model, ...FREE_MODELS.filter(m => m !== model)];

    let lastError: Error | null = null;

    for (const currentModel of modelsToTry) {
        try {
            const response = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'chrome-extension://prompt-enhancer',
                    'X-Title': 'Prompt Enhancer',
                },
                body: JSON.stringify({
                    model: currentModel,
                    messages: [
                        { role: 'system', content: ENHANCER_SYSTEM_PROMPT },
                        { role: 'user', content: userMessage },
                    ],
                    stream: !!onStream,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.error?.message || `Status ${response.status}`;
                console.warn(`Model ${currentModel} failed: ${errorMsg}`);
                lastError = new Error(errorMsg);
                continue; // Try next model
            }

            if (onStream && response.body) {
                // Handle streaming response
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullResponse = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

                    for (const line of lines) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content || '';
                            fullResponse += content;
                            onStream(fullResponse);
                        } catch {
                            // Skip malformed JSON
                        }
                    }
                }

                return fullResponse;
            } else {
                // Non-streaming response
                const data = await response.json();
                return data.choices?.[0]?.message?.content || '';
            }
        } catch (error) {
            lastError = error as Error;
            console.warn(`Model ${currentModel} failed:`, error);
            continue; // Try next model
        }
    }

    throw lastError || new Error('All OpenRouter models failed. Please check your API key.');
}

export const OPENROUTER_MODELS = [
    { value: 'meta-llama/llama-4-maverick:free', label: 'Llama 4 Maverick (Free) ⭐' },
    { value: 'deepseek/deepseek-chat-v3-0324:free', label: 'DeepSeek Chat V3 (Free)' },
    { value: 'mistralai/mistral-small-3.1-24b-instruct:free', label: 'Mistral Small 3.1 (Free)' },
    { value: 'google/gemini-2.5-pro-exp-03-25:free', label: 'Gemini 2.5 Pro (Free)' },
    { value: 'nvidia/llama-3.1-nemotron-nano-8b-v1:free', label: 'Nemotron Nano 8B (Free)' },
    { value: 'qwen/qwen2.5-vl-3b-instruct:free', label: 'Qwen 2.5 VL (Free)' },
];


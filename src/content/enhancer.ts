/**
 * Content Script Enhancer - Handles prompt enhancement for content scripts
 */

import { getApiConfig } from '../services/storage';
import { enhanceWithGemini } from '../services/gemini';
import { enhanceWithOpenRouter } from '../services/openrouter';
import { parseEnhancementResponse } from '../utils/enhancer-prompt';

export interface EnhanceResult {
    success: boolean;
    enhancedPrompt?: string;
    error?: string;
}

/**
 * Enhance a prompt using the configured API
 */
export async function enhancePrompt(rawPrompt: string): Promise<EnhanceResult> {
    try {
        // Validate input
        if (!rawPrompt || rawPrompt.trim().length === 0) {
            return {
                success: false,
                error: 'Please enter a prompt to enhance',
            };
        }

        // Get API configuration
        const config = await getApiConfig();

        // Check if API key is configured
        if (config.provider === 'gemini' && !config.geminiApiKey) {
            return {
                success: false,
                error: 'Please configure your Gemini API key in the extension settings',
            };
        }
        if (config.provider === 'openrouter' && !config.openrouterApiKey) {
            return {
                success: false,
                error: 'Please configure your OpenRouter API key in the extension settings',
            };
        }

        // Call the appropriate API
        let fullResponse = '';

        if (config.provider === 'gemini') {
            fullResponse = await enhanceWithGemini(
                config.geminiApiKey!,
                rawPrompt,
                config.geminiModel
            );
        } else {
            fullResponse = await enhanceWithOpenRouter(
                config.openrouterApiKey!,
                rawPrompt,
                config.openrouterModel
            );
        }

        // Parse the response
        const result = parseEnhancementResponse(fullResponse);

        return {
            success: true,
            enhancedPrompt: result.enhancedPrompt,
        };
    } catch (error) {
        console.error('[RePRo] Enhancement error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Enhancement failed. Please try again.',
        };
    }
}

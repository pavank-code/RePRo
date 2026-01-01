import React, { useState, useEffect, useCallback } from 'react';
import { PromptInput } from '../components/PromptInput';
import { EnhancedOutput } from '../components/EnhancedOutput';
import { SettingsModal } from '../components/SettingsModal';
import { CompareView } from '../components/CompareView';
import { getApiConfig, ApiConfig } from '../services/storage';
import { enhanceWithGemini } from '../services/gemini';
import { enhanceWithOpenRouter } from '../services/openrouter';
import { parseEnhancementResponse } from '../utils/enhancer-prompt';

const Popup: React.FC = () => {
    const [rawPrompt, setRawPrompt] = useState('');
    const [enhancedPrompt, setEnhancedPrompt] = useState('');
    const [techniques, setTechniques] = useState<string[]>([]);
    const [promptType, setPromptType] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [showCompare, setShowCompare] = useState(false);
    const [config, setConfig] = useState<ApiConfig | null>(null);
    const [hasApiKey, setHasApiKey] = useState(false);

    const loadConfig = useCallback(async () => {
        const cfg = await getApiConfig();
        setConfig(cfg);
        const hasKey = cfg.provider === 'gemini'
            ? !!cfg.geminiApiKey
            : !!cfg.openrouterApiKey;
        setHasApiKey(hasKey);
    }, []);

    useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    const handleEnhance = async () => {
        if (!config) return;

        setIsLoading(true);
        setIsStreaming(true);
        setError(null);
        setEnhancedPrompt('');
        setTechniques([]);
        setPromptType(undefined);

        try {
            let fullResponse = '';

            const onStream = (text: string) => {
                fullResponse = text;
                // Show raw response while streaming
                setEnhancedPrompt(text);
            };

            if (config.provider === 'gemini') {
                if (!config.geminiApiKey) {
                    throw new Error('Please set your Gemini API key in settings');
                }
                await enhanceWithGemini(
                    config.geminiApiKey,
                    rawPrompt,
                    config.geminiModel,
                    onStream
                );
            } else {
                if (!config.openrouterApiKey) {
                    throw new Error('Please set your OpenRouter API key in settings');
                }
                await enhanceWithOpenRouter(
                    config.openrouterApiKey,
                    rawPrompt,
                    config.openrouterModel,
                    onStream
                );
            }

            // Parse the final response
            const result = parseEnhancementResponse(fullResponse);
            setEnhancedPrompt(result.enhancedPrompt);
            setTechniques(result.techniques);
            setPromptType(result.promptType);
        } catch (err) {
            console.error('Enhancement error:', err);
            setError(err instanceof Error ? err.message : 'Failed to enhance prompt');
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div className="app-container">
            {/* Header */}
            <div className="header">
                <div className="header-title">
                    <span className="header-icon">🚀</span>
                    <h1>Prompt Enhancer</h1>
                </div>
                <button className="settings-btn" onClick={() => setShowSettings(true)}>
                    ⚙️
                </button>
            </div>

            {/* API Key Warning */}
            {!hasApiKey && (
                <div className="error-message" style={{ marginBottom: '12px', background: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)', color: 'var(--neon-purple)' }}>
                    ⚠️ No API key configured.{' '}
                    <span
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => setShowSettings(true)}
                    >
                        Open Settings
                    </span>
                </div>
            )}

            {/* Prompt Input */}
            <PromptInput
                value={rawPrompt}
                onChange={setRawPrompt}
                onEnhance={handleEnhance}
                isLoading={isLoading}
                disabled={!hasApiKey}
            />

            {/* Error Display */}
            {error && (
                <div className="error-message">
                    ❌ {error}
                </div>
            )}

            {/* Output Section */}
            {(enhancedPrompt || isStreaming) && !showCompare && (
                <EnhancedOutput
                    enhancedPrompt={enhancedPrompt}
                    techniques={techniques}
                    promptType={promptType}
                    isStreaming={isStreaming}
                />
            )}

            {/* Compare View */}
            {enhancedPrompt && showCompare && (
                <CompareView
                    original={rawPrompt}
                    enhanced={enhancedPrompt}
                />
            )}

            {/* Compare Toggle */}
            {enhancedPrompt && !isStreaming && (
                <div className="toggle-container" style={{ marginTop: '12px' }}>
                    <span className="toggle-label">Compare View</span>
                    <div
                        className={`toggle-switch ${showCompare ? 'active' : ''}`}
                        onClick={() => setShowCompare(!showCompare)}
                    />
                </div>
            )}

            {/* Empty State */}
            {!enhancedPrompt && !isStreaming && !error && (
                <div className="empty-state">
                    <div className="empty-state-icon">✨</div>
                    <div className="empty-state-text">
                        Paste any prompt above and click<br />
                        <strong>Enhance Prompt</strong> to get started
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            <SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                onSave={loadConfig}
            />
        </div>
    );
};

export default Popup;

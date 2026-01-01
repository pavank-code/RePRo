import React, { useState, useEffect } from 'react';
import { ApiConfig, getApiConfig, setApiConfig } from '../services/storage';
import { GEMINI_MODELS } from '../services/gemini';
import { OPENROUTER_MODELS } from '../services/openrouter';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
    const [config, setConfig] = useState<ApiConfig>({
        provider: 'gemini',
        geminiApiKey: '',
        openrouterApiKey: '',
        geminiModel: 'gemini-1.5-flash',
        openrouterModel: 'google/gemini-2.0-flash-exp:free',
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            getApiConfig().then(setConfig);
        }
    }, [isOpen]);

    const handleSave = async () => {
        setIsSaving(true);
        await setApiConfig(config);
        setIsSaving(false);
        onSave();
        onClose();
    };

    if (!isOpen) return null;

    const models = config.provider === 'gemini' ? GEMINI_MODELS : OPENROUTER_MODELS;
    const currentModel = config.provider === 'gemini' ? config.geminiModel : config.openrouterModel;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>⚙️ Settings</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="form-group">
                    <label className="form-label">API Provider</label>
                    <select
                        className="form-select"
                        value={config.provider}
                        onChange={e => setConfig({ ...config, provider: e.target.value as 'gemini' | 'openrouter' })}
                    >
                        <option value="gemini">Google Gemini</option>
                        <option value="openrouter">OpenRouter</option>
                    </select>
                </div>

                {config.provider === 'gemini' && (
                    <div className="form-group">
                        <label className="form-label">Gemini API Key</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="AIza..."
                            value={config.geminiApiKey || ''}
                            onChange={e => setConfig({ ...config, geminiApiKey: e.target.value })}
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                            Get your key at{' '}
                            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style={{ color: 'var(--neon-cyan)' }}>
                                aistudio.google.com
                            </a>
                        </small>
                    </div>
                )}

                {config.provider === 'openrouter' && (
                    <div className="form-group">
                        <label className="form-label">OpenRouter API Key</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="sk-or-..."
                            value={config.openrouterApiKey || ''}
                            onChange={e => setConfig({ ...config, openrouterApiKey: e.target.value })}
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                            Get your key at{' '}
                            <a href="https://openrouter.ai/keys" target="_blank" rel="noopener" style={{ color: 'var(--neon-cyan)' }}>
                                openrouter.ai/keys
                            </a>
                        </small>
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Model</label>
                    <select
                        className="form-select"
                        value={currentModel}
                        onChange={e => {
                            if (config.provider === 'gemini') {
                                setConfig({ ...config, geminiModel: e.target.value });
                            } else {
                                setConfig({ ...config, openrouterModel: e.target.value });
                            }
                        }}
                    >
                        {models.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

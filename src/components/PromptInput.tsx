import React from 'react';

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    onEnhance: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
    value,
    onChange,
    onEnhance,
    isLoading,
    disabled,
}) => {
    const charCount = value.length;

    return (
        <div className="input-section">
            <label className="input-label">Your Prompt</label>
            <textarea
                className="prompt-textarea"
                placeholder="Paste any prompt here... it can be vague, messy, or incomplete. We'll make it powerful."
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={isLoading}
            />
            <div className="input-footer">
                <span className="char-count">{charCount.toLocaleString()} characters</span>
            </div>

            <button
                className="enhance-btn"
                onClick={onEnhance}
                disabled={disabled || isLoading || !value.trim()}
                style={{ marginTop: '12px' }}
            >
                {isLoading ? (
                    <>
                        <div className="loading-spinner" />
                        Enhancing...
                    </>
                ) : (
                    <>
                        ✨ Enhance Prompt
                    </>
                )}
            </button>
        </div>
    );
};

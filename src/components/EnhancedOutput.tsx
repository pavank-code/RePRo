import React, { useState } from 'react';

interface EnhancedOutputProps {
    enhancedPrompt: string;
    techniques: string[];
    promptType?: string;
    isStreaming: boolean;
}

export const EnhancedOutput: React.FC<EnhancedOutputProps> = ({
    enhancedPrompt,
    techniques,
    promptType,
    isStreaming,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(enhancedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getTechniqueBadgeClass = (technique: string): string => {
        const t = technique.toLowerCase();
        if (t.includes('chain') || t.includes('cot')) return 'technique-badge cot';
        if (t.includes('role')) return 'technique-badge role';
        if (t.includes('few') || t.includes('shot')) return 'technique-badge fewshot';
        if (t.includes('tree') || t.includes('tot')) return 'technique-badge tot';
        if (t.includes('template') || t.includes('struct')) return 'technique-badge template';
        if (t.includes('xml')) return 'technique-badge cot';
        if (t.includes('json')) return 'technique-badge role';
        if (t.includes('image')) return 'technique-badge fewshot';
        if (t.includes('video')) return 'technique-badge tot';
        return 'technique-badge';
    };

    const getPromptTypeIcon = (type?: string): string => {
        switch (type?.toUpperCase()) {
            case 'IMAGE': return '🖼️';
            case 'VIDEO': return '🎬';
            case 'CODE': return '💻';
            case 'DATA': return '📊';
            case 'AGENT': return '🤖';
            case 'TEXT': return '📝';
            default: return '✨';
        }
    };

    if (!enhancedPrompt && !isStreaming) {
        return null;
    }

    return (
        <div className="output-section">
            <div className="output-header">
                <div className="output-label">
                    {isStreaming ? (
                        <>
                            <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <span>✅</span>
                            <span>Enhanced Prompt</span>
                            {promptType && (
                                <span style={{
                                    marginLeft: '8px',
                                    padding: '2px 8px',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: '12px',
                                    fontSize: '11px',
                                    color: 'var(--neon-cyan)'
                                }}>
                                    {getPromptTypeIcon(promptType)} {promptType}
                                </span>
                            )}
                        </>
                    )}
                </div>
                <div className="output-actions">
                    <button
                        className={`action-btn copy-btn ${copied ? 'copied' : ''}`}
                        onClick={handleCopy}
                        disabled={!enhancedPrompt}
                    >
                        {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                </div>
            </div>

            <div className="output-content">
                <pre>{enhancedPrompt || 'Generating enhanced prompt...'}</pre>
            </div>

            {techniques.length > 0 && !isStreaming && (
                <div className="techniques-section">
                    <div className="techniques-label">Applied Techniques</div>
                    <div className="techniques-list">
                        {techniques.map((technique, index) => (
                            <span key={index} className={getTechniqueBadgeClass(technique)}>
                                {technique}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


import React from 'react';

interface CompareViewProps {
    original: string;
    enhanced: string;
}

export const CompareView: React.FC<CompareViewProps> = ({ original, enhanced }) => {
    return (
        <div className="compare-container">
            <div className="compare-panel">
                <div className="compare-panel-label">Original</div>
                <pre>{original}</pre>
            </div>
            <div className="compare-panel enhanced">
                <div className="compare-panel-label">Enhanced</div>
                <pre>{enhanced}</pre>
            </div>
        </div>
    );
};

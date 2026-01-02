/**
 * Site Detector - Detects which AI platform is active and provides input selectors
 * Updated for ChatGPT 5.2+, Gemini, and Claude interfaces
 */

export interface SiteConfig {
    name: string;
    inputSelectors: string[];
    getInputElement: () => HTMLElement | null;
    getInputValue: (el: HTMLElement) => string;
    setInputValue: (el: HTMLElement, value: string) => void;
}

// ChatGPT configuration (5.2+ uses a compact input bar)
const chatGPTConfig: SiteConfig = {
    name: 'ChatGPT',
    inputSelectors: [
        // ChatGPT 5.x compact input selectors
        '#prompt-textarea',
        'div#prompt-textarea',
        'div[id="prompt-textarea"]',
        // ProseMirror based input
        '.ProseMirror[contenteditable="true"]',
        // Contenteditable with placeholder
        'div[contenteditable="true"][data-placeholder]',
        // Generic contenteditable in main area
        'main div[contenteditable="true"]',
        'form div[contenteditable="true"]',
        // Fallback textarea
        'textarea[placeholder*="Message"]',
        'textarea[placeholder*="Send"]',
        'textarea',
    ],
    getInputElement: () => {
        // Try multiple strategies for ChatGPT
        for (const selector of chatGPTConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el && (el.isContentEditable || el instanceof HTMLTextAreaElement)) {
                console.log('[RePRo] ChatGPT input found:', selector);
                return el;
            }
        }

        // Special fallback: find contenteditable in main content area
        const mainArea = document.querySelector('main');
        if (mainArea) {
            const editable = mainArea.querySelector<HTMLElement>('[contenteditable="true"]');
            if (editable) {
                console.log('[RePRo] ChatGPT input found via main area fallback');
                return editable;
            }
        }

        console.log('[RePRo] ChatGPT: No input element found');
        return null;
    },
    getInputValue: (el: HTMLElement) => {
        if (el instanceof HTMLTextAreaElement) {
            return el.value;
        }
        return el.innerText || el.textContent || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        if (el instanceof HTMLTextAreaElement) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
            // For ProseMirror/contenteditable
            el.focus();

            // Select all and delete
            document.execCommand('selectAll', false);
            document.execCommand('delete', false);

            // Insert new text
            document.execCommand('insertText', false, value);

            // Fallback if execCommand doesn't work
            if (el.innerText.trim() !== value.trim()) {
                el.innerHTML = `<p>${value}</p>`;
                el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
            }
        }
    },
};

// Gemini configuration
const geminiConfig: SiteConfig = {
    name: 'Gemini',
    inputSelectors: [
        '.ql-editor[contenteditable="true"]',
        'rich-textarea [contenteditable="true"]',
        'div.ql-editor',
        '[contenteditable="true"][aria-label]',
        '[contenteditable="true"]',
    ],
    getInputElement: () => {
        for (const selector of geminiConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el && el.getAttribute('contenteditable') === 'true') {
                console.log('[RePRo] Gemini input found:', selector);
                return el;
            }
        }
        return null;
    },
    getInputValue: (el: HTMLElement) => {
        return el.innerText || el.textContent || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        el.focus();
        el.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = value;
        el.appendChild(p);
        el.dispatchEvent(new InputEvent('input', { bubbles: true }));
    },
};

// Claude configuration
const claudeConfig: SiteConfig = {
    name: 'Claude',
    inputSelectors: [
        '.ProseMirror[contenteditable="true"]',
        'div[contenteditable="true"][data-placeholder]',
        'div[contenteditable="true"]',
        'textarea',
    ],
    getInputElement: () => {
        for (const selector of claudeConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el) {
                console.log('[RePRo] Claude input found:', selector);
                return el;
            }
        }
        return null;
    },
    getInputValue: (el: HTMLElement) => {
        if (el instanceof HTMLTextAreaElement) {
            return el.value;
        }
        return el.innerText || el.textContent || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        if (el instanceof HTMLTextAreaElement) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            el.focus();
            document.execCommand('selectAll', false);
            document.execCommand('delete', false);
            document.execCommand('insertText', false, value);
        }
    },
};

/**
 * Detect which AI platform the user is on
 */
export function detectSite(): SiteConfig | null {
    const hostname = window.location.hostname;
    console.log('[RePRo] Detecting site:', hostname);

    if (hostname.includes('chat.openai.com') || hostname.includes('chatgpt.com')) {
        console.log('[RePRo] Site: ChatGPT');
        return chatGPTConfig;
    }
    if (hostname.includes('gemini.google.com')) {
        console.log('[RePRo] Site: Gemini');
        return geminiConfig;
    }
    if (hostname.includes('claude.ai')) {
        console.log('[RePRo] Site: Claude');
        return claudeConfig;
    }

    return null;
}

/**
 * Wait for an element to appear in the DOM with multiple retry strategies
 */
export function waitForElement(selectors: string[], timeout = 20000): Promise<HTMLElement | null> {
    return new Promise((resolve) => {
        console.log('[RePRo] Waiting for input element...');

        // Check function
        const checkElements = (): HTMLElement | null => {
            for (const selector of selectors) {
                const el = document.querySelector<HTMLElement>(selector);
                if (el && (el.isContentEditable || el instanceof HTMLTextAreaElement)) {
                    return el;
                }
            }
            // ChatGPT fallback
            const mainArea = document.querySelector('main');
            if (mainArea) {
                const editable = mainArea.querySelector<HTMLElement>('[contenteditable="true"]');
                if (editable) return editable;
            }
            return null;
        };

        // Immediate check
        const immediate = checkElements();
        if (immediate) {
            console.log('[RePRo] Input found immediately');
            resolve(immediate);
            return;
        }

        // Set up observer
        const observer = new MutationObserver(() => {
            const el = checkElements();
            if (el) {
                console.log('[RePRo] Input found via observer');
                observer.disconnect();
                resolve(el);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['contenteditable'],
        });

        // Also poll periodically
        const pollInterval = setInterval(() => {
            const el = checkElements();
            if (el) {
                console.log('[RePRo] Input found via polling');
                clearInterval(pollInterval);
                observer.disconnect();
                resolve(el);
            }
        }, 500);

        // Timeout
        setTimeout(() => {
            clearInterval(pollInterval);
            observer.disconnect();
            console.log('[RePRo] Timeout waiting for input');
            resolve(null);
        }, timeout);
    });
}

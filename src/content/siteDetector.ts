/**
 * Site Detector - Detects which AI platform is active and provides input selectors
 */

export interface SiteConfig {
    name: string;
    inputSelectors: string[];
    getInputElement: () => HTMLElement | null;
    getInputValue: (el: HTMLElement) => string;
    setInputValue: (el: HTMLElement, value: string) => void;
    getButtonContainer: (inputEl: HTMLElement) => HTMLElement | null;
}

// ChatGPT configuration
const chatGPTConfig: SiteConfig = {
    name: 'ChatGPT',
    inputSelectors: [
        '#prompt-textarea',
        'textarea[data-id="root"]',
        'div[contenteditable="true"]',
        'textarea',
    ],
    getInputElement: () => {
        for (const selector of chatGPTConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el) return el;
        }
        return null;
    },
    getInputValue: (el: HTMLElement) => {
        if (el instanceof HTMLTextAreaElement) {
            return el.value;
        }
        return el.textContent || el.innerText || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        if (el instanceof HTMLTextAreaElement) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            // For contenteditable divs
            el.textContent = value;
            el.dispatchEvent(new InputEvent('input', { bubbles: true, data: value }));
        }
        // Trigger change events for React
        el.dispatchEvent(new Event('change', { bubbles: true }));
    },
    getButtonContainer: (inputEl: HTMLElement) => {
        // Position relative to the input's parent container
        return inputEl.closest('form') || inputEl.parentElement;
    },
};

// Gemini configuration
const geminiConfig: SiteConfig = {
    name: 'Gemini',
    inputSelectors: [
        '.ql-editor',
        '[contenteditable="true"]',
        'rich-textarea .textarea',
        'div[data-placeholder]',
    ],
    getInputElement: () => {
        for (const selector of geminiConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el && el.getAttribute('contenteditable') === 'true') return el;
        }
        // Fallback: find any contenteditable
        return document.querySelector<HTMLElement>('[contenteditable="true"]');
    },
    getInputValue: (el: HTMLElement) => {
        return el.textContent || el.innerText || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        el.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = value;
        el.appendChild(p);
        el.dispatchEvent(new InputEvent('input', { bubbles: true }));
    },
    getButtonContainer: (inputEl: HTMLElement) => {
        return inputEl.closest('.input-area') || inputEl.parentElement?.parentElement || inputEl.parentElement;
    },
};

// Claude configuration
const claudeConfig: SiteConfig = {
    name: 'Claude',
    inputSelectors: [
        'div[contenteditable="true"]',
        '.ProseMirror',
        'textarea',
    ],
    getInputElement: () => {
        for (const selector of claudeConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el) return el;
        }
        return null;
    },
    getInputValue: (el: HTMLElement) => {
        if (el instanceof HTMLTextAreaElement) {
            return el.value;
        }
        return el.textContent || el.innerText || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        if (el instanceof HTMLTextAreaElement) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            // For ProseMirror/contenteditable
            el.innerHTML = `<p>${value}</p>`;
            el.dispatchEvent(new InputEvent('input', { bubbles: true }));
        }
    },
    getButtonContainer: (inputEl: HTMLElement) => {
        return inputEl.closest('fieldset') || inputEl.parentElement?.parentElement || inputEl.parentElement;
    },
};

/**
 * Detect which AI platform the user is on
 */
export function detectSite(): SiteConfig | null {
    const hostname = window.location.hostname;

    if (hostname.includes('chat.openai.com') || hostname.includes('chatgpt.com')) {
        return chatGPTConfig;
    }
    if (hostname.includes('gemini.google.com')) {
        return geminiConfig;
    }
    if (hostname.includes('claude.ai')) {
        return claudeConfig;
    }

    return null;
}

/**
 * Wait for an element to appear in the DOM
 */
export function waitForElement(selectors: string[], timeout = 10000): Promise<HTMLElement | null> {
    return new Promise((resolve) => {
        // Check if element already exists
        for (const selector of selectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el) {
                resolve(el);
                return;
            }
        }

        // Set up observer
        const observer = new MutationObserver(() => {
            for (const selector of selectors) {
                const el = document.querySelector<HTMLElement>(selector);
                if (el) {
                    observer.disconnect();
                    resolve(el);
                    return;
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Timeout
        setTimeout(() => {
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
}

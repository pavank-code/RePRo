/**
 * Site Detector - Detects which AI platform is active and provides input selectors
 * Updated for ChatGPT 5.2+ and modern interfaces
 */

export interface SiteConfig {
    name: string;
    inputSelectors: string[];
    getInputElement: () => HTMLElement | null;
    getInputValue: (el: HTMLElement) => string;
    setInputValue: (el: HTMLElement, value: string) => void;
    getButtonContainer: (inputEl: HTMLElement) => HTMLElement | null;
}

// ChatGPT configuration (updated for 5.2+)
const chatGPTConfig: SiteConfig = {
    name: 'ChatGPT',
    inputSelectors: [
        // ChatGPT 5.x uses contenteditable div with ProseMirror
        '#prompt-textarea',
        'div[id="prompt-textarea"]',
        '.ProseMirror[contenteditable="true"]',
        'div[contenteditable="true"][data-placeholder]',
        'div[contenteditable="true"]',
        'textarea[placeholder*="Message"]',
        'textarea',
    ],
    getInputElement: () => {
        for (const selector of chatGPTConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el) {
                console.log('[RePRo] Found input element:', selector);
                return el;
            }
        }
        console.log('[RePRo] No input element found');
        return null;
    },
    getInputValue: (el: HTMLElement) => {
        if (el instanceof HTMLTextAreaElement) {
            return el.value;
        }
        // For contenteditable (ProseMirror), get text content
        return el.innerText || el.textContent || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        if (el instanceof HTMLTextAreaElement) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
            // For contenteditable divs (ProseMirror)
            // Clear existing content
            el.innerHTML = '';
            // Create a paragraph with the text
            const p = document.createElement('p');
            p.textContent = value;
            el.appendChild(p);

            // Dispatch events to trigger React/ProseMirror updates
            el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
            el.dispatchEvent(new Event('change', { bubbles: true }));

            // Also try setting innerText directly as fallback
            if (!el.innerText || el.innerText.trim() !== value.trim()) {
                el.innerText = value;
                el.dispatchEvent(new InputEvent('input', { bubbles: true }));
            }
        }
    },
    getButtonContainer: (inputEl: HTMLElement) => {
        // Find the form or parent container above the input
        const form = inputEl.closest('form');
        if (form) return form;

        // Try to find a suitable parent container
        let parent = inputEl.parentElement;
        for (let i = 0; i < 5 && parent; i++) {
            if (parent.classList.contains('relative') ||
                parent.tagName === 'FORM' ||
                parent.querySelector('button[data-testid="send-button"]')) {
                return parent;
            }
            parent = parent.parentElement;
        }
        return inputEl.parentElement;
    },
};

// Gemini configuration
const geminiConfig: SiteConfig = {
    name: 'Gemini',
    inputSelectors: [
        '.ql-editor[contenteditable="true"]',
        'rich-textarea [contenteditable="true"]',
        'div[contenteditable="true"][aria-label*="prompt"]',
        '[contenteditable="true"]',
        'div[data-placeholder]',
    ],
    getInputElement: () => {
        for (const selector of geminiConfig.inputSelectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el && el.getAttribute('contenteditable') === 'true') {
                console.log('[RePRo] Found Gemini input:', selector);
                return el;
            }
        }
        // Fallback: find any contenteditable
        const fallback = document.querySelector<HTMLElement>('[contenteditable="true"]');
        if (fallback) console.log('[RePRo] Found Gemini input via fallback');
        return fallback;
    },
    getInputValue: (el: HTMLElement) => {
        return el.innerText || el.textContent || '';
    },
    setInputValue: (el: HTMLElement, value: string) => {
        el.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = value;
        el.appendChild(p);
        el.dispatchEvent(new InputEvent('input', { bubbles: true }));
    },
    getButtonContainer: (inputEl: HTMLElement) => {
        return inputEl.closest('.input-area') ||
            inputEl.closest('form') ||
            inputEl.parentElement?.parentElement ||
            inputEl.parentElement;
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
                console.log('[RePRo] Found Claude input:', selector);
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
            // For ProseMirror/contenteditable
            el.innerHTML = `<p>${value}</p>`;
            el.dispatchEvent(new InputEvent('input', { bubbles: true }));
        }
    },
    getButtonContainer: (inputEl: HTMLElement) => {
        return inputEl.closest('fieldset') ||
            inputEl.closest('form') ||
            inputEl.parentElement?.parentElement ||
            inputEl.parentElement;
    },
};

/**
 * Detect which AI platform the user is on
 */
export function detectSite(): SiteConfig | null {
    const hostname = window.location.hostname;
    console.log('[RePRo] Detecting site:', hostname);

    if (hostname.includes('chat.openai.com') || hostname.includes('chatgpt.com')) {
        console.log('[RePRo] Detected ChatGPT');
        return chatGPTConfig;
    }
    if (hostname.includes('gemini.google.com')) {
        console.log('[RePRo] Detected Gemini');
        return geminiConfig;
    }
    if (hostname.includes('claude.ai')) {
        console.log('[RePRo] Detected Claude');
        return claudeConfig;
    }

    console.log('[RePRo] No matching site detected');
    return null;
}

/**
 * Wait for an element to appear in the DOM
 */
export function waitForElement(selectors: string[], timeout = 15000): Promise<HTMLElement | null> {
    return new Promise((resolve) => {
        console.log('[RePRo] Waiting for element with selectors:', selectors);

        // Check if element already exists
        for (const selector of selectors) {
            const el = document.querySelector<HTMLElement>(selector);
            if (el) {
                console.log('[RePRo] Element found immediately:', selector);
                resolve(el);
                return;
            }
        }

        // Set up observer
        const observer = new MutationObserver(() => {
            for (const selector of selectors) {
                const el = document.querySelector<HTMLElement>(selector);
                if (el) {
                    console.log('[RePRo] Element found via observer:', selector);
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
            console.log('[RePRo] Element wait timeout');
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
}

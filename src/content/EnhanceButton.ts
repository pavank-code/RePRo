/**
 * Enhance Button Component - Creates and manages the floating enhance button
 * Positioned INSIDE the input container for natural feel across all platforms
 */

import { SiteConfig } from './siteDetector';
import { enhancePrompt } from './enhancer';

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

const BUTTON_ID = 'repro-enhance-btn';
const CONTAINER_ID = 'repro-enhance-container';
const TOAST_ID = 'repro-toast';

// Debounce timer
let debounceTimer: number | null = null;
const DEBOUNCE_MS = 500;

/**
 * Create the enhance button element
 */
function createButton(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.id = BUTTON_ID;
    btn.className = 'repro-enhance-btn';
    btn.type = 'button';
    btn.innerHTML = `
        <span class="repro-btn-icon">⚡</span>
        <span class="repro-btn-text">Improve</span>
    `;
    btn.title = 'Enhance this prompt with AI (RePRo)';
    return btn;
}

/**
 * Create the button container
 */
function createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.id = CONTAINER_ID;
    container.className = 'repro-enhance-container';
    return container;
}

/**
 * Create toast notification element
 */
function createToast(): HTMLDivElement {
    const toast = document.createElement('div');
    toast.id = TOAST_ID;
    toast.className = 'repro-toast';
    return toast;
}

/**
 * Show toast message
 */
function showToast(message: string, type: 'success' | 'error' = 'error'): void {
    let toast = document.getElementById(TOAST_ID);
    if (!toast) {
        toast = createToast();
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `repro-toast repro-toast-${type} repro-toast-visible`;

    setTimeout(() => {
        toast?.classList.remove('repro-toast-visible');
    }, 4000);
}

/**
 * Update button state
 */
function updateButtonState(btn: HTMLButtonElement, state: ButtonState): void {
    btn.classList.remove('repro-btn-loading', 'repro-btn-success', 'repro-btn-error');
    btn.disabled = state === 'loading';

    const iconEl = btn.querySelector('.repro-btn-icon');
    const textEl = btn.querySelector('.repro-btn-text');

    switch (state) {
        case 'loading':
            btn.classList.add('repro-btn-loading');
            if (iconEl) iconEl.innerHTML = '<span class="repro-spinner"></span>';
            if (textEl) textEl.textContent = 'Improving...';
            break;
        case 'success':
            btn.classList.add('repro-btn-success');
            if (iconEl) iconEl.textContent = '✓';
            if (textEl) textEl.textContent = 'Improved!';
            setTimeout(() => updateButtonState(btn, 'idle'), 2000);
            break;
        case 'error':
            btn.classList.add('repro-btn-error');
            if (iconEl) iconEl.textContent = '✕';
            if (textEl) textEl.textContent = 'Failed';
            setTimeout(() => updateButtonState(btn, 'idle'), 2000);
            break;
        default:
            if (iconEl) iconEl.textContent = '⚡';
            if (textEl) textEl.textContent = 'Improve';
    }
}

/**
 * Handle enhance button click
 */
async function handleEnhanceClick(
    btn: HTMLButtonElement,
    inputEl: HTMLElement,
    siteConfig: SiteConfig
): Promise<void> {
    if (debounceTimer) return;
    debounceTimer = window.setTimeout(() => { debounceTimer = null; }, DEBOUNCE_MS);

    const originalPrompt = siteConfig.getInputValue(inputEl);
    console.log('[RePRo] Enhancing prompt:', originalPrompt.substring(0, 50) + '...');

    if (!originalPrompt || originalPrompt.trim().length === 0) {
        showToast('Please enter a prompt to improve', 'error');
        return;
    }

    updateButtonState(btn, 'loading');

    try {
        const result = await enhancePrompt(originalPrompt);

        if (result.success && result.enhancedPrompt) {
            siteConfig.setInputValue(inputEl, result.enhancedPrompt);
            updateButtonState(btn, 'success');
            inputEl.focus();
        } else {
            updateButtonState(btn, 'error');
            showToast(result.error || 'Enhancement failed', 'error');
        }
    } catch (error) {
        updateButtonState(btn, 'error');
        showToast(error instanceof Error ? error.message : 'Enhancement failed', 'error');
        console.error('[RePRo] Error:', error);
    }
}

/**
 * Position button above the input element
 */
function positionButton(container: HTMLElement, inputEl: HTMLElement): void {
    const rect = inputEl.getBoundingClientRect();

    // Position fixed, above the input, left-aligned
    container.style.cssText = `
        position: fixed !important;
        top: ${rect.top - 42}px !important;
        left: ${rect.left + 4}px !important;
        z-index: 2147483647 !important;
        pointer-events: auto !important;
    `;

    // Make sure container is in body
    if (!document.body.contains(container)) {
        document.body.appendChild(container);
    }
}

/**
 * Initialize the enhance button
 */
export function initEnhanceButton(inputEl: HTMLElement, siteConfig: SiteConfig): void {
    // Remove existing button if any
    removeEnhanceButton();

    console.log('[RePRo] Initializing button for', siteConfig.name);

    // Create elements
    const container = createContainer();
    const btn = createButton();
    container.appendChild(btn);

    // Initial position
    positionButton(container, inputEl);

    // Click handler
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleEnhanceClick(btn, inputEl, siteConfig);
    });

    // Reposition on scroll and resize
    const reposition = () => {
        if (document.body.contains(inputEl)) {
            positionButton(container, inputEl);
        } else {
            // Input was removed, clean up
            removeEnhanceButton();
        }
    };

    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);

    // Periodic repositioning for dynamic layouts
    const repositionInterval = setInterval(() => {
        if (!document.getElementById(BUTTON_ID)) {
            clearInterval(repositionInterval);
            return;
        }
        if (document.body.contains(inputEl)) {
            positionButton(container, inputEl);
        }
    }, 500);

    console.log('[RePRo] Button ready for', siteConfig.name);
}

/**
 * Remove the enhance button
 */
export function removeEnhanceButton(): void {
    const container = document.getElementById(CONTAINER_ID);
    if (container) {
        container.remove();
    }
}

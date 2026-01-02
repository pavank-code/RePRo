/**
 * Enhance Button Component - Creates and manages the floating enhance button
 * Design: Sleek gradient outline pill buttons matching ChatGPT 5.2 style
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
 * Create the enhance button element with gradient outline design
 */
function createButton(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.id = BUTTON_ID;
    btn.className = 'repro-enhance-btn';
    btn.innerHTML = `
        <span class="repro-btn-icon">⚡</span>
        <span class="repro-btn-text">Improve</span>
    `;
    btn.title = 'Enhance this prompt with AI';
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

    // Auto-hide after 4 seconds
    setTimeout(() => {
        toast?.classList.remove('repro-toast-visible');
    }, 4000);
}

/**
 * Update button state with smooth transitions
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
            // Reset after 2 seconds
            setTimeout(() => updateButtonState(btn, 'idle'), 2000);
            break;
        case 'error':
            btn.classList.add('repro-btn-error');
            if (iconEl) iconEl.textContent = '✕';
            if (textEl) textEl.textContent = 'Failed';
            // Reset after 2 seconds
            setTimeout(() => updateButtonState(btn, 'idle'), 2000);
            break;
        default: // idle
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
    // Debounce
    if (debounceTimer) {
        return;
    }
    debounceTimer = window.setTimeout(() => {
        debounceTimer = null;
    }, DEBOUNCE_MS);

    // Get current input value
    const originalPrompt = siteConfig.getInputValue(inputEl);

    if (!originalPrompt || originalPrompt.trim().length === 0) {
        showToast('Please enter a prompt to improve', 'error');
        return;
    }

    // Update state to loading
    updateButtonState(btn, 'loading');

    try {
        // Call enhancement API
        const result = await enhancePrompt(originalPrompt);

        if (result.success && result.enhancedPrompt) {
            // Replace input with enhanced prompt
            siteConfig.setInputValue(inputEl, result.enhancedPrompt);
            updateButtonState(btn, 'success');

            // Focus the input so user can edit/send
            inputEl.focus();
        } else {
            // Show error, keep original prompt
            updateButtonState(btn, 'error');
            showToast(result.error || 'Enhancement failed', 'error');
        }
    } catch (error) {
        // Keep original prompt on error
        updateButtonState(btn, 'error');
        showToast(
            error instanceof Error ? error.message : 'Enhancement failed. Please try again.',
            'error'
        );
        console.error('[RePRo] Enhancement error:', error);
    }
}

/**
 * Position the button container above the input element
 */
function positionButton(container: HTMLElement, inputEl: HTMLElement): void {
    const inputRect = inputEl.getBoundingClientRect();
    const containerParent = inputEl.closest('form') || inputEl.parentElement?.parentElement || document.body;

    // Make the parent position relative if needed
    const parentStyle = window.getComputedStyle(containerParent as HTMLElement);
    if (parentStyle.position === 'static') {
        (containerParent as HTMLElement).style.position = 'relative';
    }

    // Try to position inside the parent container
    if (containerParent && containerParent !== document.body) {
        if (!containerParent.contains(container)) {
            containerParent.insertBefore(container, inputEl.parentElement || inputEl);
        }
    } else {
        // Fallback: position fixed
        container.style.position = 'fixed';
        container.style.top = `${inputRect.top - 48}px`;
        container.style.left = `${inputRect.left}px`;
        if (!document.body.contains(container)) {
            document.body.appendChild(container);
        }
    }
}

/**
 * Initialize the enhance button for a given input element
 */
export function initEnhanceButton(inputEl: HTMLElement, siteConfig: SiteConfig): void {
    // Check if button already exists
    if (document.getElementById(BUTTON_ID)) {
        return;
    }

    // Create container and button
    const container = createContainer();
    const btn = createButton();
    container.appendChild(btn);

    // Position the button
    positionButton(container, inputEl);

    // Add click handler
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleEnhanceClick(btn, inputEl, siteConfig);
    });

    // Re-position on window resize
    window.addEventListener('resize', () => {
        positionButton(container, inputEl);
    });

    console.log(`[RePRo] Improve button initialized for ${siteConfig.name}`);
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

/**
 * RePRo Content Script - Inline Prompt Enhancement
 * 
 * This script injects the "Enhance Prompt" button into AI chat interfaces
 * (ChatGPT, Gemini, Claude) allowing users to enhance their prompts inline.
 */

import { detectSite, waitForElement } from './siteDetector';
import { initEnhanceButton, removeEnhanceButton } from './EnhanceButton';

// Check if we're on a supported site
const siteConfig = detectSite();

if (!siteConfig) {
    console.log('[RePRo] Site not supported');
} else {
    console.log(`[RePRo] Detected ${siteConfig.name}, initializing...`);

    // Wait for input element and initialize button
    initializeButton();

    // Handle SPA navigation (sites like ChatGPT use client-side routing)
    observeNavigation();
}

/**
 * Initialize the enhance button
 */
async function initializeButton(): Promise<void> {
    if (!siteConfig) return;

    // Wait for input element to appear
    const inputEl = await waitForElement(siteConfig.inputSelectors);

    if (inputEl) {
        initEnhanceButton(inputEl, siteConfig);
    } else {
        console.log('[RePRo] Could not find input element, will retry...');
        // Retry after a delay
        setTimeout(initializeButton, 2000);
    }
}

/**
 * Observe for SPA navigation events
 */
function observeNavigation(): void {
    // Listen for URL changes (pushState/replaceState)
    let lastUrl = window.location.href;

    const observer = new MutationObserver(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            console.log('[RePRo] Navigation detected, reinitializing...');

            // Remove old button
            removeEnhanceButton();

            // Wait a bit for new page to render, then reinitialize
            setTimeout(initializeButton, 1000);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Also listen for popstate (back/forward navigation)
    window.addEventListener('popstate', () => {
        console.log('[RePRo] Popstate navigation detected');
        removeEnhanceButton();
        setTimeout(initializeButton, 1000);
    });
}

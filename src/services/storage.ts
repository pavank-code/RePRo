// Chrome storage helpers for API key management

export interface ApiConfig {
    provider: 'gemini' | 'openrouter';
    geminiApiKey?: string;
    openrouterApiKey?: string;
    geminiModel: string;
    openrouterModel: string;
}

const STORAGE_KEY = 'prompt_enhancer_config';

const DEFAULT_CONFIG: ApiConfig = {
    provider: 'gemini',
    geminiApiKey: '',
    openrouterApiKey: '',
    geminiModel: 'gemini-2.0-flash',
    openrouterModel: 'meta-llama/llama-4-maverick:free',
};

export async function getApiConfig(): Promise<ApiConfig> {
    return new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.get([STORAGE_KEY], (result) => {
                resolve({ ...DEFAULT_CONFIG, ...result[STORAGE_KEY] });
            });
        } else {
            // Fallback for development
            const stored = localStorage.getItem(STORAGE_KEY);
            resolve(stored ? { ...DEFAULT_CONFIG, ...JSON.parse(stored) } : DEFAULT_CONFIG);
        }
    });
}

export async function setApiConfig(config: Partial<ApiConfig>): Promise<void> {
    const current = await getApiConfig();
    const updated = { ...current, ...config };

    return new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ [STORAGE_KEY]: updated }, () => {
                resolve();
            });
        } else {
            // Fallback for development
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            resolve();
        }
    });
}

export async function clearApiKeys(): Promise<void> {
    await setApiConfig({
        geminiApiKey: '',
        openrouterApiKey: '',
    });
}

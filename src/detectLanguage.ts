/**
 * Try to detect the browser's current language as a two-letter code, e.g. 'nl'.
 * If no browser environment can be found, this method will return undefined.
 */
export function detectLanguage(): string | undefined {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
        return undefined;
    }

    let locale = window.navigator.languages ? window.navigator.languages[0] : undefined;
    locale = locale || window.navigator.language || (window.navigator as any).browserLanguage || (window.navigator as any).userLanguage;

    return locale?.replace(/_/g, '-').split('-')?.[0];
}

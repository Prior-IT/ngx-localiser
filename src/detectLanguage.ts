/**
 * Try to detect the browser's current language as a two-letter code, e.g. 'nl'.
 * If no browser environment can be found, this method will return undefined.
 */
export function detectLanguage(): string | undefined {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
        return undefined;
    }

    const navigator = window.navigator as any;
    let locale = navigator.languages ? navigator.languages[0] : undefined;
    locale = locale || navigator.language || navigator.browserLanguage || navigator.userLanguage;

    return locale?.replace(/_/g, '-').split('-')?.[0];
}

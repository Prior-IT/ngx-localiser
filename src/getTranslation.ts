/**
 * Asynchronously load a translation file from the specified url.
 * This function currently only supports JSON files.
 */
export function getTranslation(url: string): Promise<TranslationBundle> {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.onload = () => {
            try {
                const res = JSON.parse(req.responseText) as TranslationBundle;
                resolve(res);
            } catch(e) {
                reject(e);
            }
        };

        req.onerror = () => {
            reject(new Error('Network request failed.'));
        };

        req.ontimeout = () => {
            reject(new Error('Network request timed out.'));
        };

        req.onabort = () => {
            reject(new Error('Network request aborted.'));
        };

        req.open('GET', url, true);
        req.send();
    });

}

export interface TranslationBundle {
    locale: string,
    translations: Record<string, string>;
}

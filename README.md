# PILocaliser TS

Utility functions to fix localisation issues in TypeScript and Angular.

## Running unit tests

Run `npm test` to execute the unit tests via [Jasmine](https://jasmine.github.io/).

## Usage

This framework only defines two functions:

- `detectLanguage(): string | undefined`: Try to detect the browser's current language as a two-letter code, e.g. 'nl'. If no browser environment can be found, this method will return undefined.
- `getTranslation(url: string): Promise<{ locale: string, translations: Record<string, string>}`: Asynchronously load a JSON translation file from the specified url.

Use this in your Angular application's `main.ts` file as follows:

```
import { loadTranslations } from '@angular/localize';

import { detectLanguage, getTranslation } from '@priorit/localiser';

import '@angular/localize/init';

if (environment.production) {
    enableProdMode();
}

let localeId = localStorage.getItem(KEY_LOCALE) ?? detectLanguage();

if (localeId == undefined || !(localeId in SUPPORTED_LOCALES)) {
    localeId = DEFAULT_LOCALE;
}

getTranslation(`/assets/i18n/${localeId}.json`).then(
    data => {
        if (data) {
            loadTranslations(data.translations);
        }
        platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
            const wind = window as any;
            if (wind.ngRef) {
                wind.ngRef.destroy();
            }
            wind.ngRef = ref;
        }).catch(error => {
            console.error('[main.ts] Error during AppModule bootstrapping:', error);
        })
    },
    error => {
        console.error(`[main.ts] Error while loading locale ${localeId}:`, error);
        console.error('-> Trying to bootstrap using the source locale.');
        platformBrowserDynamic().bootstrapModule(AppModule)
            .catch(err => console.error('[main.ts] Error during source-locale AppModule bootstrapping:', err) );
    }
);
```
with KEY\_LOCALE, SUPPORTED\_LOCALES, and DEFAULT\_LOCALE being constants that depend on the localisation settings of your project.

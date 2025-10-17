import { inject, Injectable, LOCALE_ID } from '@angular/core';

export const languageOptions = [
  { value: 'en-US', viewValue: $localize`English` },
  { value: 'de', viewValue: $localize`German` },
] as const;
export type language = (typeof languageOptions)[number]['value'];

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  locale = inject(LOCALE_ID);

  setLanguage(language: language) {
    let url = window.location.href;
    url = url.replace(`/${this.locale}/`, `/${language}/`);
    window.location.href = url;
  }
}

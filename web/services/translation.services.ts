import translations from '../translations';

class TranslationServices {
  private lang = '';

  init(lang: string) {
    if (!this.lang) {
      this.lang = lang.toUpperCase();
    } else {
      throw Error('Translation Service has already been initted.');
    }
  }

  gettextbylang(key: string | string[], lang: string, value?: string | string[]) {
    return this.gettext(key, value, lang.toUpperCase());
  }

  hasKey(key: string | string[]) {
    if (Array.isArray(key)) {
      const result = key.reduce(
        (acc, val) => {
          // @ts-ignore
          acc = acc[val] || translations[val];
          return {
            hasValue: acc.hasOwnProperty(val),
          };
        },
        {
          hasValue: false,
        },
      );

      return result.hasValue;
    }

    return translations.hasOwnProperty(key);
  }

  gettext(key: string | string[], value?: string | string[], lang = this.lang): string {
    try {
      if (!this.hasKey(key)) {
        return `#{ ${key} }`;
      }

      if (Array.isArray(key)) {
        const translationReduced = this.handleArray(key);
        return translationReduced[lang];
      }

      const text: string = translations[key][lang];

      if (Array.isArray(value)) {
        return value.reduce((result: string, val: string, i: number) => {
          result = result.replace(`@{${i}}`, val);
          return result;
        }, text);
      }

      if (value) {
        return text.replace('@{0}', value);
      }

      return text;
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(`Translation key not found --> "${key}" for language: "${this.lang}"`);
    }
  }

  private handleArray(array: string[]): { [key: string]: string } {
    return array.reduce((acc, val) => {
      acc = acc[val] || translations[val];
      return acc;
    }, {} as { [key: string]: string });
  }
}

export default new TranslationServices();

export type Theme = 'light' | 'dark';

export type LanguageLocal  = 'es' | 'en';

export interface AppSettings {
    theme: Theme;
    language: LanguageLocal;
}
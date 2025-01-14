import { LanguageLocal } from "./local-storage.interface";

export type ThemeIcon = 'pi pi-sun' | 'pi pi-moon';

export interface LanguageNavBar {
    value: LanguageLocal,
    label: string
}

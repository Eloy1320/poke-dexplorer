import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from 'src/utils/constants/constants';
import { LanguageLocal, Theme } from '@app/interfaces/local-storage.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setTheme(theme:Theme){
    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, theme);
  }

  setLanguage(language:LanguageLocal){
    localStorage.setItem(LOCAL_STORAGE_KEYS.language, language);
  }

  getTheme():Theme{
    let value = localStorage.getItem(LOCAL_STORAGE_KEYS.theme);
    return value ? (value as Theme) : 'light';
  }

  getLanguage():LanguageLocal{
    let value = localStorage.getItem(LOCAL_STORAGE_KEYS.language);
    return value ? (value as LanguageLocal) : 'es';
  }

}

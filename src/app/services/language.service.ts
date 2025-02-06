import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageChangeSubject = new Subject<string>();
  languageChange$ = this.languageChangeSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.languageChangeSubject.next(event.lang);
    });
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
  
}
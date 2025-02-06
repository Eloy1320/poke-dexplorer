import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { LocalStorageService } from '@app/services/local-storage.service';
import { LanguageLocal, Theme } from '@app/interfaces/local-storage.interface';
import { LanguageNavBar, ThemeIcon } from '@app/interfaces/navbar.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTER_VALUES } from 'src/utils/constants/constants';
import { LanguageService } from '@app/services/language.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    SelectModule,
    TranslateModule,
    FormsModule
  ],
})
export class NavbarComponent {

  translate: TranslateService = inject(TranslateService);
  language!:LanguageNavBar[];
  themeIcon:ThemeIcon = "pi pi-sun";
  selectedLanguage!:LanguageNavBar;

  currentLanguage!: LanguageLocal;
  private currentTheme!: Theme;

  constructor(
    private localStorageService:LocalStorageService,
    private router:Router,
    private languageService: LanguageService
  ){
    
  }

  ngOnInit() {

    this.currentTheme = this.localStorageService.getTheme();
    if(this.currentTheme == 'dark'){
      this.initializeTheme();
    }

    this.currentLanguage = this.localStorageService.getLanguage();
    if(this.currentLanguage != 'es'){
      this.initializeLanguage();
      this.selectedLanguage = { value: 'en', label: 'English' }
    }else{
      this.selectedLanguage = { value: 'es', label: 'Español' }
    }

    this.language =  [
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'English' }
    ];
  
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
      this.currentTheme = this.currentTheme == 'light' ? 'dark' : 'light';
      this.themeIcon = this.themeIcon == 'pi pi-sun' ? 'pi pi-moon' : 'pi pi-sun';
      this.localStorageService.setTheme(this.currentTheme);
    }
  }

  private initializeTheme(){
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
      this.themeIcon = "pi pi-moon"
    }
  }

  private initializeLanguage(){
    this.languageService.setLanguage(this.currentLanguage);
  }

  changeLanguage(){
    this.languageService.setLanguage(this.selectedLanguage.value);
    this.currentLanguage = this.selectedLanguage.value;
    this.localStorageService.setLanguage(this.currentLanguage);
  }

  handleGitHubBtn(){
    window.open('https://github.com/Eloy1320/poke-dexplorer', '_blank');
  }

  onClickLogo(){
    this.router.navigate([ROUTER_VALUES.HOME])
  }

}

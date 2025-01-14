import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { LocalStorageService } from '@app/services/local-storage.service';
import { Theme } from '@app/interfaces/local-storage.interface';
import { ThemeIcon } from '@app/interfaces/navbar.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    SelectModule,
    AvatarModule
  ],
})
export class NavbarComponent {

  items: MenuItem[] | undefined;
  lenguaje:any;
  themeIcon:ThemeIcon = "pi pi-sun";

  private currentTheme!: Theme;

  constructor(
    private localStorageService:LocalStorageService
  ){

  }

  ngOnInit() {

    this.currentTheme = this.localStorageService.getTheme();
    console.log(this.currentTheme)
    if(this.currentTheme == 'dark'){
      this.initializeTheme();
    }

    this.lenguaje = [
      { name: 'Ingles'},
      { name: 'Español'},
  ];

    this.items =[
      {
        label: 'File',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus' },
          { label: 'Open', icon: 'pi pi-fw pi-folder-open' },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', icon: 'pi pi-fw pi-undo' },
          { label: 'Redo', icon: 'pi pi-fw pi-repeat' },
        ],
      },
      {
        separator: true, // Línea separadora opcional
      },
      {
        label: '',
        icon: 'pi pi-fw pi-ellipsis-v',
        items: [
          { label: 'Option 1' },
          { label: 'Option 2' },
          { label: 'Option 3' },
        ],
      },
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

  handleGitHubBtn(){
    window.open('https://github.com/Eloy1320/poke-dexplorer', '_blank');
  }

}

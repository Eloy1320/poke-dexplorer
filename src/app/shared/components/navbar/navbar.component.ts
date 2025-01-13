import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';


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

  ngOnInit() {

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

}

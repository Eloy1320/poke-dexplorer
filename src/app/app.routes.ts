import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ROUTER_VALUES } from 'src/utils/constants/constants';

export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: ROUTER_VALUES.HOME, component:HomeComponent},
    {path: '**', redirectTo:ROUTER_VALUES.HOME },
];

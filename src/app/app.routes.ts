import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ROUTER_VALUES } from 'src/utils/constants/constants';
import { DetailPokeComponent } from './pages/detail-poke/detail-poke.component';

export const routes: Routes = [
    {path: "", component:HomeComponent},
    {path: ROUTER_VALUES.HOME, component:HomeComponent},
    {path: ROUTER_VALUES.DETAIL+"/:id"  , component:DetailPokeComponent},
    {path: '**', redirectTo:ROUTER_VALUES.HOME },
];

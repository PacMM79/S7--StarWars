import { Routes } from '@angular/router';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'starships', component: StarshipListComponent },
    { path: 'starship/:id', component: StarshipDetailsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AprendreComponent } from './aprendre.component';
import { RecursosComponent } from './recursos.component';
import { SobreComponent } from './sobre.component';
import { ContaminacioComponent } from './contaminacio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aprendre', component: AprendreComponent },
  { path: 'contaminacio', component: ContaminacioComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

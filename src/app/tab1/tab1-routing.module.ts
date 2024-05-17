import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'facil',
    loadChildren: () => import('./games/facil/facil.module').then(m => m.FacilPageModule)
  },
  {
    path: 'medio',
    loadChildren: () => import('./games/medio/medio.module').then(m => m.MedioPageModule)
  },
  {
    path: 'dificil',
    loadChildren: () => import('./games/dificil/dificil.module').then(m => m.DificilPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule { }

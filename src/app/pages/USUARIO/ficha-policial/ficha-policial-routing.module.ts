import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaPolicialPage } from './ficha-policial.page';

const routes: Routes = [
  {
    path: '',
    component: FichaPolicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaPolicialPageRoutingModule {}

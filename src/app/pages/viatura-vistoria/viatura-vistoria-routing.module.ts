import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaVistoriaPage } from './viatura-vistoria.page';

const routes: Routes = [
  {
    path: '',
    component: ViaturaVistoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViaturaVistoriaPageRoutingModule {}

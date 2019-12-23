import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaFichaPage } from './viatura-ficha.page';

const routes: Routes = [
  {
    path: '',
    component: ViaturaFichaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViaturaFichaPageRoutingModule {}

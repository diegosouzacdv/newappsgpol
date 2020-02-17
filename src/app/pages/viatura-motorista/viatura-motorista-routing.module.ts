import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaMotoristaPage } from './viatura-motorista.page';

const routes: Routes = [
  {
    path: '',
    component: ViaturaMotoristaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViaturaMotoristaPageRoutingModule {}

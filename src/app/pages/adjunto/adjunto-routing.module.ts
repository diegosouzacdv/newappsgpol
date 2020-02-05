import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdjuntoPage } from './adjunto.page';

const routes: Routes = [
  {
    path: '',
    component: AdjuntoPage,
    data: {
      allowedRoles: ['ROLE_SGF_ADJUNTO']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdjuntoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessdeniedPage } from './accessdenied.page';

const routes: Routes = [
  {
    path: '',
    component: AccessdeniedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessdeniedPageRoutingModule {}

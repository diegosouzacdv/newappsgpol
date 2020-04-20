import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersoesAppPage } from './versoes-app.page';

const routes: Routes = [
  {
    path: '',
    component: VersoesAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VersoesAppPageRoutingModule {}

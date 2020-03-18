import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntradaSaidaPage } from './entrada-saida.page';

const routes: Routes = [
  {
    path: '',
    component: EntradaSaidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntradaSaidaPageRoutingModule {}

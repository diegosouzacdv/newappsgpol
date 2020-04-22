import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InserirVersaoPage } from './inserir-versao.page';

const routes: Routes = [
  {
    path: '',
    component: InserirVersaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [
    InserirVersaoPage
  ],
})
export class InserirVersaoPageRoutingModule {}

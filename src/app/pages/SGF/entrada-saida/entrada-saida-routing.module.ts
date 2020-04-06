import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntradaSaidaPage } from './entrada-saida.page';
import { ResolverPatio } from 'src/app/resolvers/ResolverViatura';

const routes: Routes = [
  {
    path: '',
    component: EntradaSaidaPage,
    resolve: {
      data: ResolverPatio
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntradaSaidaPageRoutingModule {}

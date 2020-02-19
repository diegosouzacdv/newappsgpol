import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaVistoriaPage } from './viatura-vistoria.page';
import { ResolverViaturaId } from 'src/app/resolvers/ResolverViatura';

const routes: Routes = [
  {
    path: '',
    component: ViaturaVistoriaPage,
    resolve: {
      viatura: ResolverViaturaId,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResolverViaturaId]
})
export class ViaturaVistoriaPageRoutingModule {}

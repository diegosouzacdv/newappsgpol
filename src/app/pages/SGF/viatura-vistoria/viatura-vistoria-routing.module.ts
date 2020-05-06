import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaVistoriaPage } from './viatura-vistoria.page';
import { ResolverViaturaId } from 'src/app/resolvers/ResolverViatura';
import { ResolverVistoria, ResolverViaturaTemVistoria } from 'src/app/resolvers/ResolverVistoria';

const routes: Routes = [
  {
    path: '',
    component: ViaturaVistoriaPage,
    resolve: {
      viatura: ResolverViaturaId,
      vistoria: ResolverVistoria,
      temVistoria: ResolverViaturaTemVistoria
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResolverViaturaId, ResolverVistoria]
})
export class ViaturaVistoriaPageRoutingModule {}

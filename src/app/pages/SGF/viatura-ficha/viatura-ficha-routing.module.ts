import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaFichaPage } from './viatura-ficha.page';
import { ResolverViaturaId, ResolverTemVistoria, ResolverListViaturaVistoria } from 'src/app/resolvers/ResolverViatura';

const routes: Routes = [
  {
    path: '',
    component: ViaturaFichaPage,
    resolve: {
      viatura: ResolverViaturaId,
      isVistoria: ResolverTemVistoria,
      viaturaVistoria: ResolverListViaturaVistoria
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResolverViaturaId, ResolverTemVistoria, ResolverListViaturaVistoria]
})
export class ViaturaFichaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaFichaPage } from './viatura-ficha.page';
import { ResolverViaturaId} from 'src/app/resolvers/ResolverViatura';

const routes: Routes = [
  {
    path: '',
    component: ViaturaFichaPage,
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
export class ViaturaFichaPageRoutingModule {}

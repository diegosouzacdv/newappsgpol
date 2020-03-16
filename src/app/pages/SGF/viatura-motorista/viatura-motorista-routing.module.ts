import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaMotoristaPage } from './viatura-motorista.page';
import { ResolverListViaturaVistoria } from 'src/app/resolvers/ResolverViatura';

const routes: Routes = [
  {
    path: '',
    component: ViaturaMotoristaPage,
    resolve : {
      isVistoria: ResolverListViaturaVistoria,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResolverListViaturaVistoria]
})
export class ViaturaMotoristaPageRoutingModule {}

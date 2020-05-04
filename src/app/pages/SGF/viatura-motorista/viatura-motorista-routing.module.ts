import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaturaMotoristaPage } from './viatura-motorista.page';
import { ResolverListViaturaEmUso } from 'src/app/resolvers/ResolverViatura';

const routes: Routes = [
  {
    path: '',
    component: ViaturaMotoristaPage,
    resolve : {
      isViaturaEmUso: ResolverListViaturaEmUso,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResolverListViaturaEmUso]
})
export class ViaturaMotoristaPageRoutingModule {}
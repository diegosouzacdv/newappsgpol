import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';
import { ResolverUser } from 'src/app/resolvers/ResolverUser';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage,
    resolve: {
      data: ResolverUser,

    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}

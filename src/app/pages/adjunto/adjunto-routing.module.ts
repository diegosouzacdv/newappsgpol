import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdjuntoPage } from './adjunto.page';
import { ResolverUser } from 'src/app/resolvers/ResolverUser';

const routes: Routes = [
  {
    path: '',
    component: AdjuntoPage,
    data: {
      allowedRoles: ['ROLE_SGF_ADJUNTO']
    },
    resolve: {
      policial: ResolverUser
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ResolverUser]
})
export class AdjuntoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersoesAppPage } from './versoes-app.page';
import { ResolverVersoes } from 'src/app/resolvers/ResolverVersoes';

const routes: Routes = [
  {
    path: '',
    component: VersoesAppPage,
    data: {
      allowedRoles: ['ROLE_APP_ADMIN']
    },
    resolve: {
      data: ResolverVersoes
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VersoesAppPageRoutingModule {}

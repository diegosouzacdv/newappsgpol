import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ResolverHome } from '../resolvers/ResolverHome';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      pages: ResolverHome
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

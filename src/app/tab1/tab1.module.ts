import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ResolverUser } from '../resolvers/ResolverUser';
import { ResolverFoto } from '../resolvers/ResolverFoto';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    resolve: {
      data: ResolverUser,

    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab1Page],
  providers: [
    ResolverUser,
  ]
})
export class Tab1PageModule {}

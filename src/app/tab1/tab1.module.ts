import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ResolverUser } from '../resolvers/ResolverUser';
import { ShellModule } from 'src/app/shell/shell.module';
import { DadosBasicoPolicialModule } from '../Components/dados-basico-policial/dados-basico-policial.module';
import { PessoalPageRoutingModule } from '../pages/menu/pessoal/pessoal-routing.module';

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
    ShellModule,
    FormsModule,
    PessoalPageRoutingModule,
    DadosBasicoPolicialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab1Page],
  providers: [
    ResolverUser,
  ],
  exports: []
})
export class Tab1PageModule {}

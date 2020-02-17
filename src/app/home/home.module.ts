import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PessoalPageRoutingModule } from '../pages/menu/pessoal/pessoal-routing.module';
import { DadosBasicoPolicialModule } from '../pages/dados-basico-policial/dados-basico-policial.module';
import { SgfPageRoutingModule } from '../pages/menu/sgf/sgf-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PessoalPageRoutingModule,
    SgfPageRoutingModule,
    DadosBasicoPolicialModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PessoalPageRoutingModule } from '../pages/menu/pessoal/pessoal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PessoalPageRoutingModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

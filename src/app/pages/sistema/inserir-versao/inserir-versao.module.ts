import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InserirVersaoPageRoutingModule } from './inserir-versao-routing.module';

import { InserirVersaoPage } from './inserir-versao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InserirVersaoPageRoutingModule
  ],
  declarations: [InserirVersaoPage],
})
export class InserirVersaoPageModule {}

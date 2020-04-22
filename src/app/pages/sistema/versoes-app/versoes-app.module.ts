import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VersoesAppPageRoutingModule } from './versoes-app-routing.module';

import { VersoesAppPage } from './versoes-app.page';
import { DadosBasicoPolicialModule } from 'src/app/Components/dados-basico-policial/dados-basico-policial.module';
import { InserirVersaoPageModule } from '../inserir-versao/inserir-versao.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DadosBasicoPolicialModule,
    IonicModule,
    VersoesAppPageRoutingModule,
    InserirVersaoPageModule
  ],
  declarations: [VersoesAppPage],
  exports:[VersoesAppPage],
})
export class VersoesAppPageModule {}

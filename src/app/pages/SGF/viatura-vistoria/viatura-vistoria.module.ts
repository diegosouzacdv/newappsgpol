import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaturaVistoriaPageRoutingModule } from './viatura-vistoria-routing.module';

import { ViaturaVistoriaPage } from './viatura-vistoria.page';
import { SliderFotosItemPageModule } from '../slider-fotos-item/slider-fotos-item.module';
import { BotaoSituacaoViaturaComponentModule } from 'src/app/Components/botao-situacao-viatura/botao-situacao-viatura.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViaturaVistoriaPageRoutingModule,
    BotaoSituacaoViaturaComponentModule,
    SliderFotosItemPageModule
  ],
  declarations: [ViaturaVistoriaPage]
})
export class ViaturaVistoriaPageModule {}

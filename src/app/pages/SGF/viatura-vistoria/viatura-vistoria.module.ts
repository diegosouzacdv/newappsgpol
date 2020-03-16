import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaturaVistoriaPageRoutingModule } from './viatura-vistoria-routing.module';

import { ViaturaVistoriaPage } from './viatura-vistoria.page';
import { SliderFotosItemPageModule } from '../slider-fotos-item/slider-fotos-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViaturaVistoriaPageRoutingModule,
    SliderFotosItemPageModule
  ],
  declarations: [ViaturaVistoriaPage]
})
export class ViaturaVistoriaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaturaFichaPageRoutingModule } from './viatura-ficha-routing.module';

import { ViaturaFichaPage } from './viatura-ficha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViaturaFichaPageRoutingModule
  ],
  declarations: [ViaturaFichaPage]
})
export class ViaturaFichaPageModule {}

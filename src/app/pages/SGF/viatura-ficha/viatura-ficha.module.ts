import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaturaFichaPageRoutingModule } from './viatura-ficha-routing.module';

import { ViaturaFichaPage } from './viatura-ficha.page';
import { BotaoSituacaoViaturaComponentModule } from 'src/app/Components/botao-situacao-viatura/botao-situacao-viatura.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViaturaFichaPageRoutingModule,
    BotaoSituacaoViaturaComponentModule
  ],
  declarations: [ViaturaFichaPage]
})
export class ViaturaFichaPageModule {}

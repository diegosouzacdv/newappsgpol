import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntradaSaidaPageRoutingModule } from './entrada-saida-routing.module';

import { EntradaSaidaPage } from './entrada-saida.page';
import { DadosBasicoPolicialModule } from 'src/app/Components/dados-basico-policial/dados-basico-policial.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntradaSaidaPageRoutingModule,
    DadosBasicoPolicialModule
  ],
  declarations: [EntradaSaidaPage]
})
export class EntradaSaidaPageModule {}

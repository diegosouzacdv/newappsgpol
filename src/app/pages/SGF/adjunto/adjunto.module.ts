import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdjuntoPageRoutingModule } from './adjunto-routing.module';
import { AdjuntoPage } from './adjunto.page';
import { DadosBasicoPolicialModule } from '../../../Components/dados-basico-policial/dados-basico-policial.module';
import { ShellModule } from 'src/app/shell/shell.module';
import { PesquisaViaturaPageModule } from '../pesquisa-viatura/pesquisa-viatura.module';
import { ResultadoPesquisaViaturaVistoriaPageModule } from 'src/app/Components/resultado-pesquisa-viatura-vistoria/resultado-pesquisa-viatura-vistoria.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PesquisaViaturaPageModule,
    ResultadoPesquisaViaturaVistoriaPageModule,
    DadosBasicoPolicialModule,
    ShellModule,
    IonicModule,
    AdjuntoPageRoutingModule
  ],
  declarations: [AdjuntoPage]
})
export class AdjuntoPageModule {}

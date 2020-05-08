import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ViaturaMotoristaPageRoutingModule } from './viatura-motorista-routing.module';

import { ViaturaMotoristaPage } from './viatura-motorista.page';
import { ShellModule } from 'src/app/shell/shell.module';
import { DadosBasicoPolicialModule } from '../../../Components/dados-basico-policial/dados-basico-policial.module';
import { PesquisaViaturaPageModule } from '../pesquisa-viatura/pesquisa-viatura.module';
import { ResultadoPesquisaViaturaVistoriaPageModule } from 'src/app/Components/resultado-pesquisa-viatura-vistoria/resultado-pesquisa-viatura-vistoria.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PesquisaViaturaPageModule,
    ResultadoPesquisaViaturaVistoriaPageModule,
    DadosBasicoPolicialModule,
    IonicModule,
    ShellModule,
    ViaturaMotoristaPageRoutingModule,
  ],
  declarations: [ViaturaMotoristaPage]
})
export class ViaturaMotoristaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ViaturaMotoristaPageRoutingModule } from './viatura-motorista-routing.module';

import { ViaturaMotoristaPage } from './viatura-motorista.page';
import { ShellModule } from 'src/app/shell/shell.module';
import { DadosBasicoPolicialModule } from '../../../Components/dados-basico-policial/dados-basico-policial.module';
import { PesquisaViaturaPageModule } from '../pesquisa-viatura/pesquisa-viatura.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DadosBasicoPolicialModule,
    IonicModule,
    ShellModule,
    ViaturaMotoristaPageRoutingModule,
    PesquisaViaturaPageModule
  ],
  declarations: [ViaturaMotoristaPage]
})
export class ViaturaMotoristaPageModule {}

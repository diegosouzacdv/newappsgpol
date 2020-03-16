import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdjuntoPageRoutingModule } from './adjunto-routing.module';

import { AdjuntoPage } from './adjunto.page';
import { DadosBasicoPolicialModule } from '../../../Components/dados-basico-policial/dados-basico-policial.module';
import { ShellModule } from 'src/app/shell/shell.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DadosBasicoPolicialModule,
    ShellModule,
    IonicModule,
    AdjuntoPageRoutingModule
  ],
  declarations: [AdjuntoPage]
})
export class AdjuntoPageModule {}

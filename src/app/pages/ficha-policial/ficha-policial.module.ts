import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaPolicialPageRoutingModule } from './ficha-policial-routing.module';

import { FichaPolicialPage } from './ficha-policial.page';
import { DadosBasicoPolicialModule } from '../dados-basico-policial/dados-basico-policial.module';
import { ShellModule } from 'src/app/shell/shell.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShellModule,
    DadosBasicoPolicialModule,
    FichaPolicialPageRoutingModule
  ],
  declarations: [FichaPolicialPage],
  exports: [FichaPolicialPage],
  entryComponents:[FichaPolicialPage]
})
export class FichaPolicialPageModule {}

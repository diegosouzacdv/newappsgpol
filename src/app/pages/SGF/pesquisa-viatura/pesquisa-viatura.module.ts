import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PesquisaViaturaPage } from './pesquisa-viatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [PesquisaViaturaPage],
  exports: [PesquisaViaturaPage]
})
export class PesquisaViaturaPageModule {}

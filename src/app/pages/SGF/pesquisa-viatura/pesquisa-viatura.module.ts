import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PesquisaViaturaPage } from './pesquisa-viatura.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [PesquisaViaturaPage],
  exports: [PesquisaViaturaPage]
})
export class PesquisaViaturaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResultadoPesquisaViaturaVistoriaPage } from './resultado-pesquisa-viatura-vistoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ResultadoPesquisaViaturaVistoriaPage],
  exports: [ResultadoPesquisaViaturaVistoriaPage]
})
export class ResultadoPesquisaViaturaVistoriaPageModule {}

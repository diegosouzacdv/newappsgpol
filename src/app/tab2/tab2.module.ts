import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ShellModule } from '../shell/shell.module';
import { DadosBasicoPolicialModule } from '../Components/dados-basico-policial/dados-basico-policial.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DadosBasicoPolicialModule,
    FormsModule,
    ShellModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}

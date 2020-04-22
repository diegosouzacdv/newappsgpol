import { NgModule } from '@angular/core';

import { PessoalPage } from './pessoal.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,  
    FormsModule
  ],
    declarations: [PessoalPage],
    exports: [PessoalPage],
})
export class PessoalPageRoutingModule {}

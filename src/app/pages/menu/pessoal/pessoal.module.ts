import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PessoalPageRoutingModule } from './pessoal-routing.module';

import { PessoalPage } from './pessoal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PessoalPageRoutingModule
  ],
  declarations: [PessoalPage]
})
export class PessoalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SgfPageRoutingModule } from './sgf-routing.module';

import { SgfPage } from './sgf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SgfPageRoutingModule
  ],
  declarations: [SgfPage]
})
export class SgfPageModule {}

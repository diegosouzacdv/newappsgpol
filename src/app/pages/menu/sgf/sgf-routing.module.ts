import { NgModule } from '@angular/core';

import { SgfPage } from './sgf.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [IonicModule,
    CommonModule,  
    FormsModule,
  ],
  declarations: [SgfPage],
    exports: [SgfPage],
})
export class SgfPageRoutingModule {}

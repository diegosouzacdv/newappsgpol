import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessdeniedPageRoutingModule } from './accessdenied-routing.module';

import { AccessdeniedPage } from './accessdenied.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessdeniedPageRoutingModule
  ],
  declarations: [AccessdeniedPage]
})
export class AccessdeniedPageModule {}

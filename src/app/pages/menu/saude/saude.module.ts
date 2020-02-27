import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaudePageRoutingModule } from './saude-routing.module';

import { SaudePage } from './saude.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaudePageRoutingModule
  ],
  declarations: [SaudePage]
})
export class SaudePageModule {}

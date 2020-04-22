import { NgModule } from '@angular/core';

import { SaudePage } from './saude.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
  IonicModule,
  CommonModule,  
  FormsModule,
],
  declarations: [SaudePage],
  exports: [SaudePage],
})
export class SaudePageRoutingModule {}

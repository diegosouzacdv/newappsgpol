import { NgModule } from '@angular/core';

import { SaudePage } from './saude.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShellModule } from 'src/app/shell/shell.module';


@NgModule({
  imports: [
  IonicModule,
  CommonModule,  
  FormsModule,
  ShellModule
],
  declarations: [SaudePage],
  exports: [SaudePage],
})
export class SaudePageRoutingModule {}

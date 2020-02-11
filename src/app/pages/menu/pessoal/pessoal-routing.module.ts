import { NgModule } from '@angular/core';

import { PessoalPage } from './pessoal.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShellModule } from 'src/app/shell/shell.module';


@NgModule({
  imports: [IonicModule,
    CommonModule,  
    FormsModule,
    ShellModule
  ],
    declarations: [PessoalPage],
    exports: [PessoalPage],
})
export class PessoalPageRoutingModule {}

import { NgModule } from "@angular/core";
import { DadosBasicoPolicialComponent } from './dados-basico-policial.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShellModule } from 'src/app/shell/shell.module';

@NgModule({
    imports: [IonicModule,
            CommonModule,  
            FormsModule,
            ShellModule],
    declarations: [DadosBasicoPolicialComponent],
    exports: [DadosBasicoPolicialComponent]
})
export class DadosBasicoPolicialModule{}
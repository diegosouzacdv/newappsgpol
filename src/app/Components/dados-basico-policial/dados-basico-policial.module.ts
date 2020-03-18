import { NgModule } from "@angular/core";
import { DadosBasicoPolicialComponent } from './dados-basico-policial.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [IonicModule,
            CommonModule,  
            FormsModule],
    declarations: [DadosBasicoPolicialComponent],
    exports: [DadosBasicoPolicialComponent]
})
export class DadosBasicoPolicialModule{}
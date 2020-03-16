import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShellModule } from 'src/app/shell/shell.module';
import { BotaoSituacaoViaturaComponent } from './botao-situacao-viatura.component';

@NgModule({
    imports: [IonicModule,
            CommonModule,  
            FormsModule,
            ShellModule],
    declarations: [BotaoSituacaoViaturaComponent],
    exports: [BotaoSituacaoViaturaComponent]
})
export class BotaoSituacaoViaturaComponentModule{}
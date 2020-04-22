import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradorPage } from './administrador.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,  
    FormsModule   
  ],
  declarations: [AdministradorPage],
  exports: [AdministradorPage],
})
export class AdministradorPageRoutingModule {}

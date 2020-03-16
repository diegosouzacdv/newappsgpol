import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SliderFotosItemPage } from './slider-fotos-item.page';
import { ShellModule } from 'src/app/shell/shell.module';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShellModule
  ],
  declarations: [SliderFotosItemPage],
  exports: [SliderFotosItemPage],
  providers:[
    Camera,
    PhotoViewer]
})
export class SliderFotosItemPageModule {}

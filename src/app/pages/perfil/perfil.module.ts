import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { ResolverUser } from 'src/app/resolvers/ResolverUser';
import { ShellModule } from 'src/app/shell/shell.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShellModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage],
  providers: [
    ResolverUser,
  ]
})
export class PerfilPageModule {}

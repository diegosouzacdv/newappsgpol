import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [LoginGuard] 
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'viatura-ficha/:adjunto',
    loadChildren: () => import('./pages/viatura-ficha/viatura-ficha.module').then( m => m.ViaturaFichaPageModule)
  },
  {
    path: 'vistoria/:id/:temVistoria/:adjunto',
    loadChildren: () => import('./pages/viatura-vistoria/viatura-vistoria.module').then( m => m.ViaturaVistoriaPageModule)
  },
  {
    path: 'adjunto',
    loadChildren: () => import('./pages/adjunto/adjunto.module').then( m => m.AdjuntoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

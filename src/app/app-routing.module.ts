import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

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
    path: 'viatura-ficha/:id/:adjunto',
    loadChildren: () => import('./pages/SGF/viatura-ficha/viatura-ficha.module').then( m => m.ViaturaFichaPageModule)
  },
  {
    path: 'vistoria/:id/:temVistoria/:adjunto',
    loadChildren: () => import('./pages/SGF/viatura-vistoria/viatura-vistoria.module').then( m => m.ViaturaVistoriaPageModule)
  },
  {
    path: 'adjunto',
    loadChildren: () => import('./pages/SGF/adjunto/adjunto.module').then( m => m.AdjuntoPageModule), canActivateChild: [AuthorizationGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'viatura-motorista',
    loadChildren: () => import('./pages/SGF/viatura-motorista/viatura-motorista.module').then( m => m.ViaturaMotoristaPageModule)
  },
  {
    path: 'accessdenied',
    loadChildren: () => import('./pages/accessdenied/accessdenied.module').then( m => m.AccessdeniedPageModule)
  },
  {
    path: 'entrada-saida',
    loadChildren: () => import('./pages/sgf/entrada-saida/entrada-saida.module').then( m => m.EntradaSaidaPageModule)
  },
  {
    path: 'versoes',
    loadChildren: () => import('./pages/versoes-app/versoes-app.module').then( m => m.VersoesAppPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

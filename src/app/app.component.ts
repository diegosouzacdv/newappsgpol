import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PolicialDTO } from './models/policial.dto';
import { StorageService } from './services/storage.service';
import { PolicialService } from './services/domain/policial.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Início',
      url: '/tabs/tab1',
      icon: 'home'
    },
    {
      title: 'Viatura',
      url: '/tabs/tab2',
      icon: 'car'
    },
    {
      title: 'Efetivo',
      url: '/tabs/tab3',
      icon: 'people'
    }
  ];

  public policial: PolicialDTO;
  private subscribeUser: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    public policialService: PolicialService,
    public authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ionViewWillEnter() {
    this.getPolicial();

  }

  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
      this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          this.policial = response;
          console.log(this.policial);
        },
        error => {}
        );
    }
  }

  logout() {
    this.authService.logout();
  }

  ionViewWillLeave() {
    this.subscribeUser.unsubscribe();
  }
}

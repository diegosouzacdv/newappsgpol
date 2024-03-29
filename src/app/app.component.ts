import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PolicialDTO } from './models/policial.dto';
import { StorageService } from './services/storage.service';
import { PolicialService } from './services/domain/policial.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public policial: PolicialDTO;
  private subscribeUser: Subscription;
  public selectedPath = '';

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    public policialService: PolicialService,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private appVersion: AppVersion,
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url != undefined) {
        this.selectedPath = event.url;
      }
    })
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

  async ionViewWillLeave() {
    try {
      this.subscribeUser = this.policialService.usuarioLogado()
      .subscribe(response => {
      },
      error => {
        this.error();
        this.authService.logout();
      });
    } finally {
    }
    this.subscribeUser.unsubscribe();
  }

  error() {
    const alert = this.alertCtrl.create({
        header: 'Login',
        message: 'Faça o Login Novamente',
        backdropDismiss: true,
        buttons: [
            {text: 'Ok'}
        ]
    // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => alert.present());
    }

    versionApp() {
      let version;
      let name;
      this.appVersion.getVersionNumber()
      .then(response => {
        version = response;
      });
      this.appVersion.getAppName()
      .then(response => {
        name = response;
        console.log(name)
        const alert = this.alertCtrl.create({
          header: 'Versão',
          message: this.listVersion(version, name),
          backdropDismiss: false,
          buttons: [
              {text: 'Ok'}
          ]
      // tslint:disable-next-line: no-shadowed-variable
      }).then(alert => alert.present());
      });
      }

      private listVersion(version, name): string {
        let s = '';
        s = s + '<p>' + 'Nome:<strong> ' + name + '</strong>' + '<br> Versão:<strong>  ' + version + '</strong> ' +  '</p>';
        return s;
    }
}

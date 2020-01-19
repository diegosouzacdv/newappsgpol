import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public versao;
  public nome;
  public vs = '1.0.1';

  constructor(
    public alertCtrl: AlertController,
    private appVersion: AppVersion,
  ) {}

  ngOnInit() {
    this.versionApp();
  }

  versionApp() {
    let version;
    let versaoBD;
    this.appVersion.getVersionNumber()
    .then(response => {
      version = this.transformarNum(response);
      versaoBD = this.transformarNum(this.vs);
      if (version < versaoBD) {
        this.alertaNovaVersao();
      }
    });
    }

    public async alertaNovaVersao() {
      const alertCtrl = await this.alertCtrl.create({
        header: 'Nova versão disponível',
        message: 'Atualizar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Sim',
            handler: () => {

              alert('Teste de nova versão');
            }
          }
        ]
      });
      await alertCtrl.present();
    }

  transformarNum(versao): number {
    // tslint:disable-next-line: radix
    const space = parseInt(versao.split('.').join(''));
    console.log(space);
    return space;
  }

}

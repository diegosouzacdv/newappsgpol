import { Component } from '@angular/core';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public versao;
  public nome;
  public versaoBD;
  private versaoSubscription: Subscription;
  loading;

  constructor(
    public alertCtrl: AlertController,
    private appVersion: AppVersion,
    public storage: StorageService,
    private platform: Platform,
    private fileTransfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    private loadingController: LoadingController,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.getVersao();
  }

  getVersao() {
    this.versaoSubscription =  this.storage.getVersao()
        .subscribe(response => {
          console.log(response)
          this.versaoBD = response;
          this.versionApp();
        });
    }

    versionApp() {
      let version;
      let versaoBD;
      this.appVersion.getVersionNumber()
      .then(response => {
        console.log(response)
        version = this.transformarNum(response);
        versaoBD = this.transformarNum(this.versaoBD.versao);
        if (version < versaoBD) {
          this.alertaNovaVersao();
        } else {
          if (this.platform.is('android')) {
            this.excluirApk(this.file.externalDataDirectory);
          } else {
            this.excluirApk(this.file.documentsDirectory);
          }
          this.storage.setAtualizacao(null);
        }
      });
      }

      public excluirApk(iosORandroid) {
        this.file.removeFile(iosORandroid, "app-debug.apk") 
              .then(sucess => {
                this.storage.setAtualizacao(null);
                console.log(sucess)
              },error => {
                console.log(error)
              })
      }

      public async alertaNovaVersao() {
        const alertCtrl = await this.alertCtrl.create({
          header: 'Nova versão disponível',
          message: 'Atualizar o aplicativo?',
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
                this.downloadFile();
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

  async downloadFile() {
    let path;
    await this.download();
    try {
    if (this.platform.is('android')) {
      path = this.file.externalDataDirectory;
    } else {
      path = this.file.documentsDirectory;
    }
    const transf = this.fileTransfer.create();
    transf.download(this.versaoBD.url,
      path + "app-debug.apk").then(data => {
        console.log(data)
        this.loading.dismiss();
        const url = data;
        console.log(url.nativeURL)
        this.storage.setAtualizacao(url.nativeURL);
        console.log(this.storage.getAtualizacao())
        this.fileOpener.open(url.nativeURL, 'application/vnd.android.package-archive')
        .then(sucess => {
          console.log(sucess)
          this.authService.logout();
        }, (error) => {
          this.erroAtualizacao();
        });
      },
      error => {
        this.loading.dismiss();
      });
  } finally {
  }
}

async download() {
  this.loading = await this.loadingController.create({
    message: 'Por favor, aguarde... <b>Fazendo Download.</b>'
  });
  return this.loading.present();
  }

  public erroAtualizacao() {
    const alert = this.alertCtrl.create({
        header: 'Erro na atualização',
        message: 'Não foi posivel atualizar o aplicativo',
        backdropDismiss: false,
        buttons: [
            {text: 'Ok'}
        ]
    // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => alert.present());
    }

    ionViewWillLeave() {
      this.versaoSubscription.unsubscribe();
    }

}

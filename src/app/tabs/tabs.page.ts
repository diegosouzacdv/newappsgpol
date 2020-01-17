import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public versao;
  public nome;
  public vs = '1.0.12';
  
  constructor(
    public alertCtrl: AlertController,
    private appVersion: AppVersion,
    private transfer: FileTransfer, 
    private file: File,
    private filePa
    ) {}

  ngOnInit() {
    //this.versionApp();
    this.transformarNum(this.vs)
    }

    versionApp() {
      let version;
      this.appVersion.getVersionNumber()
      .then(response => {
        version = this.transformarNum(response)
        const versaoBD = this.transformarNum(this.vs)
        if(version < versaoBD) {
          this.alertaNovaVersao();
        }
      })
      }

      public async alertaNovaVersao() {
        const alert = await this.alertCtrl.create({
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
                
                console.log('link download')
              }
            }
          ]
        });
        await alert.present();
      }

     

      transformarNum(versao): number {
        var space = parseInt(versao.split('.').join(''))
        console.log(space)
        return space;
      }
}

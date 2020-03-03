import { Component, OnInit } from '@angular/core';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { StorageService } from 'src/app/services/storage.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { Subscription } from 'rxjs';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss', 
  'perfil.shell.scss'],
})
export class PerfilPage implements OnInit {

  policial: PolicialDTO;
  private subscribeUser: Subscription;

  constructor(
    public storage: StorageService,
    public policialService: PolicialService,
    private appVersion: AppVersion,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.getPolicial();
  }

  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
     this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          console.log(response)
          this.policial = response;
          this.policial.nome = `${this.policial.nome} - ${this.policial.posto} ${this.policial.quadro}`
          this.policial.rg = `${this.policial.rg} ${this.policial.orgaoexpedidorrg}`
          this.policial.tempoServico.tempoAverbado.total = `${this.policial.tempoServico.tempoAverbado.anos} a - ${this.policial.tempoServico.tempoAverbado.meses} m - ${this.policial.tempoServico.tempoAverbado.dias} d`
        },
        error => {}
        );
    }
  }

  ionViewWillLeave() {
    this.subscribeUser.unsubscribe();
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

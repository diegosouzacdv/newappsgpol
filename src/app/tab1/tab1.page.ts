import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PolicialDTO } from '../models/policial.dto';
import { PolicialService } from '../services/domain/policial.service';
import { LocalizacaoDTO } from '../models/localizacao.dto';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController } from '@ionic/angular';
import { AuthorizationService } from '../services/authorization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pages } from '../models/pages';
import { PagesService } from '../services/page.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private subscribeUser: Subscription;
  public policial: PolicialDTO;
  public localizacao: LocalizacaoDTO;
  public urlAtualizacao = this.storage.getAtualizacao();
  private helper = new JwtHelperService();
  public pages: Pages;


  constructor(
    public policialService: PolicialService,
    public storage: StorageService,
    public alertController: AlertController,
    private fileOpener: FileOpener,
    public authService: AuthService,
    public authorization: AuthorizationService,
    public pagesServices: PagesService) {}

  public resolverUser() {
    this.subscribeUser = this.policialService.usuarioLogado()
    .subscribe((response) => {
      this.policial = response;
    });
  }

  // ngOnInit() {
  //   this.resolverUser();
  // }

  async ionViewWillEnter() {
    this.resolverUser();
    this.pagesServices.getListingDataSource()
      .subscribe(response => {
        console.log(response)
        //this.pages = response;
      })
  }

  public changePage(pagina: string) {
    // this.pages.forEach((element) => {
    //   if(element.nome === pagina) {
    //     element.ativo = true;
    //   } else {
    //     element.ativo = false;
    //   }
    // });
  }

  downloadatualiza() {
    this.fileOpener.open(this.urlAtualizacao, 'application/vnd.android.package-archive')
      .then(sucess => {
        this.storage.setAtualizacao(null);
        this.authService.logout();
      }, (error) => {
        this.storage.setAtualizacao(null);
        this.urlAtualizacao = null;
        this.erroAtualizacao();
      });

  }

  refreshToken() {
    this.authService.refreshToken()
      .subscribe(response => {
        console.log(response);
      });
  }

  public erroAtualizacao() {
    const alert = this.alertController.create({
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
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
  }

}

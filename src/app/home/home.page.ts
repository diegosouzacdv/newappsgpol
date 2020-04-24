import { Component, OnInit, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { Pages } from '../models/pages';
import { PagesService } from '../services/page.service';
import { AuthService } from '../services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AppComponent } from '../app.component';
import { StorageService } from '../services/storage.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { PolicialService } from '../services/domain/policial.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Versao } from '../models/versao/versao';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public pages: Pages[];
  public versao;
  public nome;
  public versaoBD;
  private versaoSubscription: Subscription;
  loading;
  public nomeUsuario = '';
  private subscribeUser: Subscription;
  private subscribePages: Subscription;

  public urlAtualizacao = this.storage.getAtualizacao();
  public classes = {
    pessoal: false,
    sgf: false,
    saude: false,
    administrador: false
  }

  public appPages = [
    {
      title: 'Adjunto',
      roels: false
    },
    {
      title: 'Administrador',
      roels: false
    }
  ];
  public versions: Versao[] = [];


  constructor(
    public pagesServices: PagesService,
    public policialService: PolicialService,
    private route: ActivatedRoute,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private appVersion: AppVersion,
    public storage: StorageService,
    private platform: Platform,
    private fileTransfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    private loadingController: LoadingController,
    private db: DatabaseService,

  ) { }

  ngOnInit() {
    this.getVersao();
    this.permissoesAcesso();
    this.resolverUser();
    this.getPages();
    this.getDatabase();
  }

  getDatabase() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getVersion(2)
          .then(response => {
            console.log(response)
          })
      }
    })
  }

  getPages() {
    this.subscribePages = this.route.data.subscribe((resolvedRouteData) => {
      this.pages = resolvedRouteData.pages;
    })
  }

  public resolverUser() {
    this.subscribeUser = this.policialService.usuarioLogado()
      .subscribe((response) => {
        console.log(response)
        this.nomeUsuario = response.nomeGuerra.substring(0, 1);
        this.nomeUsuario = this.nomeUsuario + this.nomeUsuario;
      });
  }

  public permissoesAcesso() {
    let permissao = this.storage.getLocalUser()
    if (permissao.authorities) {
      permissao.authorities.forEach(response => {
        if (response == 'ROLE_SGF_ADJUNTO') {
          this.appPages.forEach((element, i) => {
            if (element.title === 'Adjunto') {
              this.appPages[i].roels = true;
            }
          });
        }
        if (response == 'ROLE_APP_ADMIN') {
          this.appPages.forEach((element, i) => {
            if (element.title === 'Administrador') {
              this.appPages[i].roels = true;
            }
          });
        }
      })
    }

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

  getVersao() {
    this.versaoSubscription = this.storage.getVersao()
      .subscribe(response => {
        this.versaoBD = response;
        this.versionApp();
      });
  }

  versionApp() {
    let version;
    let versaoBD;
    this.appVersion.getVersionNumber()
      .then(response => {
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
      }, error => {
      })
  }

  public async alertaNovaVersao() {
    const alertCtrl = await this.alertCtrl.create({
      header: 'Nova versão disponível',
      message: '<strong>Atualize para novas funcionalidades e correções</strong> <br> Atualizar o aplicativo?',
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
          this.loading.dismiss();
          const url = data;
          this.storage.setAtualizacao(url.nativeURL);
          this.fileOpener.open(url.nativeURL, 'application/vnd.android.package-archive')
            .then(sucess => {
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
      message: 'Por favor, aguarde... <b>Fazendo Download.</b>',
      mode: 'ios',
      spinner: 'lines'
    });
    return this.loading.present();
  }

  public erroAtualizacao() {
    const alert = this.alertCtrl.create({
      header: 'Erro na atualização',
      message: 'Não foi posivel atualizar o aplicativo',
      backdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
      // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => alert.present());
  }

  ionViewWillLeave() {
    this.versaoSubscription.unsubscribe();
  }


  public changePage(pagina: string) {
    this.mudarClasse(pagina);
    this.pages.forEach((element) => {
      if (element['nome'] === pagina) {
        element['ativo'] = true;
      } else {
        element['ativo'] = false;
      }
    });
  }

  public mudarClasse(pagina: string) {
    console.log(pagina)
    if (pagina == 'pessoal') {
      this.classes.pessoal = !this.classes.pessoal;
      this.classes.sgf = false;
      this.classes.saude = false;
      this.classes.administrador = false;
    }

    if (pagina == 'sgf') {
      this.classes.sgf = !this.classes.sgf;
      this.classes.pessoal = false;
      this.classes.saude = false;
      this.classes.administrador = false;
    }

    if (pagina == 'saude') {
      this.classes.saude = !this.classes.saude;
      this.classes.pessoal = false;
      this.classes.sgf = false;
      this.classes.administrador = false;
    }

    if (pagina == 'administrador') {
      this.classes.administrador = !this.classes.administrador;
      this.classes.pessoal = false;
      this.classes.sgf = false;
      this.classes.saude = false;
    }
  }


  logout() {
    this.authService.logout();
  }


}


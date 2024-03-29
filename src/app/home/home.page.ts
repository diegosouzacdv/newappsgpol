import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Pages } from '../models/pages';
import { PagesService } from '../services/page.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, Platform, AnimationController, Animation } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { StorageService } from '../services/storage.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { PolicialService } from '../services/domain/policial.service';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Versao } from '../models/versao/versao';
import { DadosResumoPolicial } from '../models/dados-resumo-policial';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('square', { static: false }) square: ElementRef;
  anim: Animation;

  public pages: Pages[];
  public versao;
  public nome;
  public versaoBD;
  private versaoSubscription: Subscription;
  loading;
  public nomeUsuario = '';
  private subscribeUser: Subscription;
  private subscribePages: Subscription;
  public dadosResumoPolicial: DadosResumoPolicial;
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
    private animationCTRL: AnimationController
  ) { }

  ngOnInit() {
    this.getVersao();
    this.permissoesAcesso();
    this.resolverUser();
    this.getPages();
    this.getDatabase();
  }

  ngAfterViewInit() {
    this.anim = this.animationCTRL.create('myanim');
    this.anim
      .addElement(this.square.nativeElement)
      .duration(400)
      .easing('ease-out')
      .fromTo('transform', 'translateX(300px)', 'translateX(0px)')
      .fromTo('opacity', 0.2, 1)
  }

  getDatabase() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getVersions().subscribe(response => {
          this.versions = response;
        })
      }
    })
  }

  getPages() {
    this.subscribePages = this.route.data.subscribe((resolvedRouteData) => {
      this.pages = resolvedRouteData.pages;
    })
  }

  public async dadosPagePessoal() {
    const user = this.storage.getLocalUser();
    if (user) {
      await this.policialService.dadosResumoPolicial()
        .subscribe(response => {
          this.dadosResumoPolicial = response;
        })
    } else {
      this.authService.logout();
    }
  }

  public resolverUser() {
    this.subscribeUser = this.policialService.usuarioLogado()
      .subscribe((response) => {
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

  updateVersion(versao: Versao) {
    versao.lida = 0;
    this.db.updateVersion(versao)
      .then(response => {
        this.getDatabase();
      })
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

          this.salvarSqliteAlerta(version);
        }
      });
  }

  public salvarSqliteAlerta(versao) {
    this.db.retorn.subscribe((response: Versao[]) => {
      console.log(response)
      if (response.length > 0) {
        console.log(`Tem essa versão ${versao} no banco`)
      } else {
        console.log(`Não tem essa versão ${versao} no banco`)
      }
    })


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
    if (pagina == 'pessoal') {
      this.dadosPagePessoal()
      this.classes.pessoal = !this.classes.pessoal;
      this.classes.sgf = false;
      this.classes.saude = false;
      this.classes.administrador = false;
      this.anim.play();
    }

    if (pagina == 'sgf') {
      this.classes.sgf = !this.classes.sgf;
      this.classes.pessoal = false;
      this.classes.saude = false;
      this.classes.administrador = false;
      this.anim.play();
    }

    if (pagina == 'saude') {
      this.classes.saude = !this.classes.saude;
      this.classes.pessoal = false;
      this.classes.sgf = false;
      this.classes.administrador = false;
      this.anim.play();
    }

    if (pagina == 'administrador') {
      this.classes.administrador = !this.classes.administrador;
      this.classes.pessoal = false;
      this.classes.sgf = false;
      this.classes.saude = false;
      this.anim.play();
    }
  }


  logout() {
    this.authService.logout();
  }


}


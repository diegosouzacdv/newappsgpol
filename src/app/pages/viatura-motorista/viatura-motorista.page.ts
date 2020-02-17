import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { NavigationExtras, Router } from '@angular/router';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { Subscription } from 'rxjs';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { StorageService } from 'src/app/services/storage.service';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';

@Component({
  selector: 'app-viatura-motorista',
  templateUrl: './viatura-motorista.page.html',
  styleUrls: ['./viatura-motorista.page.scss'],
})
export class ViaturaMotoristaPage {
  viaturas: ViaturaDTO[];
  viaturasUnidade: ViaturaDTO[] = [];
  viatura: ViaturaDTO;
  public policial: PolicialDTO;
  public page: number = 0;
  public busca: string = ''
  showCard = false;
  loading: any;
  showWarning = false;
  showViaturaUnidade = false;
  private subscribeUser: Subscription;
  private subscribeViaUni: Subscription;
  private subscribeViaId: Subscription;
  private subscribeVistoria: Subscription;
  private subscribePesquisa: Subscription;
  private subscribeViaturaVistoria: Subscription;
  adjunto = false;
  situacaoViatura;
  public temVistoriaViatura;

  constructor(
    public navCtrl: NavController,
    public viaturaService: ViaturaService,
    public router: Router,
    public policialService: PolicialService,
    public storage: StorageService,
    private loadingController: LoadingController,
    public alertController: AlertController,
    public itensVistoriaService: ItensVistoriaService, ) {
    this.situacaoViatura = SituacaoViatura;
  }
  // ngOnInit() {
  //   this.getPolicial();
  //   this.getViaturaVistoria();
  // }

  ionViewWillEnter() {
    this.getPolicial();
    this.getViaturaVistoria();
    this.showViaturaUnidade = false;

  }
  getViaturaVistoria() {
    this.subscribeViaturaVistoria = this.viaturaService.getViaturaVistoria()
      .subscribe(response => {
        this.temVistoriaViatura = response;
        console.log(response)
      })
  }

  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
      this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          console.log(response)
          this.policial = response;
        },
          error => { });
    }
  }

  consultarViatura() {
    if (this.busca !== '') {
      this.subscribePesquisa = this.viaturaService.pesquisarViatura(3, this.page, this.busca)
        .subscribe(response => {
          console.log(response)
          //Solicitar que a API retorne somente um array e não um objeto
          const vtrs = Object.keys(response).map(content => response[content]);
          this.viaturas = vtrs[0];
          if (vtrs[0].length == 0) {
            this.semViatura(this.busca);
          } else {
            this.showCard = true;
          }
        },
          error => { });
    } else {
      this.viatura = null;
      this.viaturas = null;
      this.vazio();
    }
  }

  async listarViaturasUnidade() {
    await this.presentLoading();
    try {
      if (this.policial.lotacaoCodigo !== null || this.policial.lotacaoCodigo !== undefined) {
        this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo)
          .subscribe(response => {
            this.loading.dismiss();
            this.viaturasUnidade = response['content'];
            if (this.viaturasUnidade.length === 0) {
              this.showWarning = !this.showWarning
            } else {
              this.showViaturaUnidade = true;
            }
          }, (errors => {
            this.loading.dismiss();
          }));
      }
    } finally {}
    }

  buscarViatura(viatura: ViaturaDTO, placa: String) {
    this.subscribeViaId = this.viaturaService.buscarViatura(placa)
      .subscribe(response => {
        const vtr = Object.keys(response).map(content => response[content]);
        const navExtras: NavigationExtras = {
          state: {
            viatura: vtr[0][0]
          }
        };
        this.router.navigate([`/viatura-ficha/${this.adjunto}`], navExtras);
      });
  }

  fichaViatura(viatura: ViaturaDTO) {
    this.viatura = viatura;
    const navExtras: NavigationExtras = {
      state: {
        viatura
      }
    };
    this.router.navigate([`/viatura-ficha/${this.adjunto}`], navExtras);
  }

  async semViatura(placa: string) {
    const alert = await this.alertController.create({
      subHeader: 'Viatura não encontrada',
      message: 'O SGF não possui viatura com a placa ' + placa + '!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async vazio() {
    const alert = await this.alertController.create({
      subHeader: 'Campo Pesquisa Vazio',
      message: 'Placa é Obrigatória!',
      buttons: ['OK']
    });
    await alert.present();
  }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
    if (!this.subscribeViaUni.closed) { this.subscribeViaUni.unsubscribe(); }
    if (!this.subscribeViaId.closed) { this.subscribeViaId.unsubscribe(); }
    if (!this.subscribeVistoria.closed) { this.subscribeVistoria.unsubscribe(); }
    if (!this.subscribePesquisa.closed) { this.subscribePesquisa.unsubscribe(); }
    if (!this.subscribeViaturaVistoria.closed) { this.subscribeViaturaVistoria.unsubscribe(); }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.listarViaturasUnidade();
      this.viaturas = null;
      event.target.complete();
    }, 2000);
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
      mode: 'ios'
    });
    return this.loading.present();
  }

}

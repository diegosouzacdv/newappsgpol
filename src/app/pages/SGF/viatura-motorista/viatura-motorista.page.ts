import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { StorageService } from 'src/app/services/storage.service';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viatura-motorista',
  templateUrl: './viatura-motorista.page.html',
  styleUrls: ['./viatura-motorista.page.scss'],
})
export class ViaturaMotoristaPage {
  viaturasUnidade: ViaturaDTO[] = [];
  public viaturas: ViaturaDTO[];
  viatura: ViaturaDTO;
  public policial: PolicialDTO;
  public quantPagina: number = 3;
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
  public temVistoriaViatura: ViaturaDTO[];
  public busca: string;

  constructor(
    public navCtrl: NavController,
    public viaturaService: ViaturaService,
    public router: Router,
    public policialService: PolicialService,
    public storage: StorageService,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public itensVistoriaService: ItensVistoriaService, 
    public authService: AuthService) {
    this.situacaoViatura = SituacaoViatura;
  }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPolicial();
    this.getViaturaVistoria();
    this.showViaturaUnidade = false;
  }

  buscaPesquisa(event) {
    this.busca = event;
  }

  getViaturaVistoria() {
    this.subscribeViaturaVistoria = this.route.data.subscribe((resolvedRouteData) => {
      this.temVistoriaViatura = resolvedRouteData.isVistoria;
      console.log(this.temVistoriaViatura)
    })
  }


  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
      this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          this.policial = response;
        },
          error => { });
    }
  }

  async listarViaturasUnidade() {
    await this.presentLoading();
    try {
      if (this.policial.lotacaoCodigo !== null || this.policial.lotacaoCodigo !== undefined) {
        this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo)
          .subscribe(response => {
            this.loading.dismiss();
            this.viaturasUnidade = response;
            if (this.viaturasUnidade.length === 0) {
              this.showWarning = !this.showWarning
            } else {
              this.showViaturaUnidade = true;
            }
          }, (errors => {
            this.loading.dismiss();
          }));
      }
    } finally { }
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
  logout() {
    this.authService.logout();
  }

}

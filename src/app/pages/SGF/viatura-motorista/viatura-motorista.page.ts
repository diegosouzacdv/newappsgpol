import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { Subscription } from 'rxjs';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { StorageService } from 'src/app/services/storage.service';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ViaturaTemVistoriaDTO } from 'src/app/models/viatura-tem-vistoria.dto';

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
  loading: any;
  semViaturasUnidade = false;
  showViaturaUnidade = false;
  private subscribeUser: Subscription;
  private subscribeViaUni: Subscription;
  private subscribeTemVistoria: Subscription;
  private subscribeVistoria: Subscription;
  private subscribePesquisa: Subscription;
  private subscribeViaturaVistoria: Subscription;
  situacaoViatura;
  public temViaturaEmUso: ViaturaTemVistoriaDTO[];
  private temVistoria = 'false';
  public busca: string;
  private page: number = 0;
  public quantPagina: number = 3;

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

  vistoriar(idViatuira: number) {
    this.router.navigate(['/vistoria', idViatuira, this.temVistoria, 'false'])
  }

  ionViewWillEnter() {
    this.getPolicial();
    this.getViaturaEmUso();
    this.showViaturaUnidade = false;
    this.page = 0;
    this.viaturasUnidade = null;
  }

  buscaPesquisa(event) {
    this.busca = event;
  }

  getViaturaEmUso() {
    this.subscribeViaturaVistoria = this.route.data.subscribe((resolvedRouteData) => {
      this.temViaturaEmUso = resolvedRouteData.isViaturaEmUso;
      console.log(this.temViaturaEmUso)
      this.temVistoria = 'true';
    })
  }


  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
      this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          this.policial = response;
          console.log(this.policial.matricula)
        },
          error => { });
    }
  }

  async listarViaturasUnidade() {
    await this.presentLoading();
    try {
      if (this.policial.lotacaoCodigo !== null || this.policial.lotacaoCodigo !== undefined) {
        this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
          .subscribe(response => {
            this.loading.dismiss();
            console.log(response)
            this.viaturasUnidade = response['content'];
            console.log(this.viaturasUnidade)
            this.viaturasUnidade.forEach(viatura => {
             this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
                .subscribe(response => {
                  viatura.viaturaTemVistoria = response;
                  if (viatura.viaturaTemVistoria.idVistoria !== null) {
                    this.temVistoria = 'true';
                  }
                })
            })

            if (this.viaturasUnidade.length === 0) {
              this.semViaturasUnidade = !this.semViaturasUnidade
            } else {
              this.showViaturaUnidade = true;
            }
          }, (errors => {
            this.loading.dismiss();
          }));
      }
    } finally { }
  }

  async listarViaturasUnidadeLoading() {
        this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
          .subscribe(response => {
            this.viaturasUnidade = this.viaturasUnidade.concat(response['content']);
            console.log(this.viaturasUnidade)

            this.viaturasUnidade.forEach(viatura => {
             this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
                .subscribe(response => {
                  viatura.viaturaTemVistoria = response;
                  if (viatura.viaturaTemVistoria.idVistoria !== null) {
                    this.temVistoria = 'true';
                  }
                })
            })

            if (this.viaturasUnidade.length === 0) {
              this.semViaturasUnidade = !this.semViaturasUnidade
            } else {
              this.showViaturaUnidade = true;
            }
          }); 
  }

  

  isViaturaVistoria(viaturas: ViaturaDTO[]) {
    this.viaturas = viaturas;
    this.viaturas.forEach(viatura => {
      this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
        .subscribe(response => {
          viatura.viaturaTemVistoria = response;
        })
    })
  }


  ionViewWillLeave() {
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
    if (!this.subscribeViaUni.closed) { this.subscribeViaUni.unsubscribe(); }
    if (!this.subscribeTemVistoria.closed) { this.subscribeTemVistoria.unsubscribe(); }
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

  loadViaturasUnidade(event) {
    setTimeout(() => {
      console.log('Done');
      this.page++;
      this.listarViaturasUnidadeLoading();
      event.target.complete();
      if (this.viaturasUnidade.length < 0) {
        event.target.disabled = true;
      }
    }, 500);
  }

}

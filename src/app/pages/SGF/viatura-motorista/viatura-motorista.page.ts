import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { Subscription } from 'rxjs';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { StorageService } from 'src/app/services/storage.service';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ViaturaTemVistoriaDTO } from 'src/app/models/viatura-tem-vistoria.dto';
import { API_CONFIG } from 'src/app/config/api.config';
import { UtilsService } from 'src/app/services/domain/utils.service';

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
  private subscribeViaUni: Subscription;
  private subscribeTemVistoria: Subscription;
  private subscribeVistoria: Subscription;
  private subscribePesquisa: Subscription;
  private subscribeViaturaVistoria: Subscription;
  situacaoViatura;
  public temViaturaEmUso: ViaturaTemVistoriaDTO[];
  public busca: string;
  private page: number = 0;
  public quantPagina: number = 3;
  public data: Date = new Date();
  public dataHojeNumero: number;
  public proximaRevisao: boolean;
  pageable;

  constructor(
    public navCtrl: NavController,
    public viaturaService: ViaturaService,
    public router: Router,
    public storage: StorageService,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public itensVistoriaService: ItensVistoriaService,
    public authService: AuthService,
    public utilsService: UtilsService) {
    this.situacaoViatura = SituacaoViatura;
  }
  ngOnInit() {
  }

  async vistoriar(viatura?: ViaturaDTO, idviatura?: number) {
    await this.presentLoading();
    let id = viatura !== null ? viatura.id : idviatura;
    this.router.navigate(['/vistoria', id,  'false'])

  }

  ionViewWillEnter() {
    let data: Date = new Date();
    this.dataHojeNumero = this.transNumData(this.utilsService.dataAtualFormatada(data));
    this.listarViaturasUnidade();
    this.getViaturaEmUso();
    this.showViaturaUnidade = false;
    this.page = 0;
    this.viaturasUnidade = null;
  }

  ionViewDidLeave() {
    this.loading.dismiss();
  }

  buscaPesquisa(event) {
    this.busca = event;
  }

  getViaturaEmUso() {
    this.subscribeViaturaVistoria = this.route.data.subscribe((resolvedRouteData) => {
      this.temViaturaEmUso = resolvedRouteData.isViaturaEmUso;
      console.log(this.temViaturaEmUso)
    })
  }

  async listarViaturasUnidade() {
    try {
      if (this.policial.lotacaoCodigo !== null || this.policial.lotacaoCodigo !== undefined) {
        this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
          .subscribe(response => {
            this.viaturasUnidade = response['content'];
            this.pageable = response;
            
            if (this.viaturasUnidade != null && this.viaturasUnidade.length > 0) {
              this.viaturasUnidade.forEach(viatura => {
               this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
                  .subscribe(response => {
                    viatura.viaturaTemVistoria = response;
  
                    if (viatura.dataProximaRevisao != null) {
                      viatura.dataFormatadaProximaRevisao = this.transNumData(viatura.dataProximaRevisao);
                      console.log(viatura.dataFormatadaProximaRevisao)
                    } 
                    viatura = this.viaturaService.verificarOdometroDataRevisao(viatura, this.dataHojeNumero)
                  })
              })
            }

            if (this.viaturasUnidade.length === 0) {
              this.semViaturasUnidade = !this.semViaturasUnidade
            } else {
              this.showViaturaUnidade = true;
            }
          }, (errors => {
          }));
      }
    } finally { }
  }

  async listarViaturasUnidadeLoading() {
        this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
          .subscribe(response => {
            this.viaturasUnidade = this.viaturasUnidade.concat(response['content']);
            console.log(this.viaturasUnidade)
            this.pageable = response;
            this.viaturasUnidade.forEach(viatura => {
             this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
                .subscribe(response => {
                  viatura.viaturaTemVistoria = response;
                  if (viatura.dataProximaRevisao != null) {
                    viatura.dataFormatadaProximaRevisao = this.transNumData(viatura.dataProximaRevisao);
                    console.log(viatura.dataFormatadaProximaRevisao)
                  }

                  viatura = this.viaturaService.verificarOdometroDataRevisao(viatura, this.dataHojeNumero)
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
    if(this.viaturas != null) {
      this.viaturas.forEach(viatura => {
        this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
          .subscribe(response => {
            viatura.viaturaTemVistoria = response;

            if (viatura.dataProximaRevisao != null) {
              viatura.dataFormatadaProximaRevisao = this.transNumData(viatura.dataProximaRevisao);
              console.log(viatura.dataFormatadaProximaRevisao)
            }

            viatura = this.viaturaService.verificarOdometroDataRevisao(viatura, this.dataHojeNumero)
          })
      })
    }
  }

  public transNumData(data: string): number {
    return this.utilsService.transformarNum(data);
  }


  ionViewWillLeave() {
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
      if (this.pageable.last === true) {
        console.log('final')
        event.target.disabled = true;
      }
    }, 500);
  }

}

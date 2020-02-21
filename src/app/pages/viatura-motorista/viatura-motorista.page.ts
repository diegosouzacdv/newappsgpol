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
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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
  public temVistoriaViatura: ViaturaDTO[];
  public pesquisa: Subject<string> = new Subject<string>();
  public via: Observable<ViaturaDTO | ViaturaDTO[]>;

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
    this.via = this.pesquisa
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((termo: string) => {
          this.busca = termo;
          console.log(termo)
          return this.viaturaService.pesquisarViatura(3, this.page, this.busca)
        }),
        catchError((erro) => {
          return of<ViaturaDTO>();
        })
      );
    this.via.subscribe((viaturas: ViaturaDTO[]) => {
      // tslint:disable-next-line: no-string-literal
      console.log(viaturas)
      this.viaturas = viaturas['content'];
      if (viaturas['content'].length == 0) {
        this.semViatura(this.busca);
      } else {
        this.showCard = true;
      }
    });
  }

  ionViewWillEnter() {
    this.getPolicial();
    this.getViaturaVistoria();
    this.showViaturaUnidade = false;



  }

  public async getPesquisa(nome: string) {
    this.pesquisa.next(nome);
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

  limparPlaca() {
    this.viatura = null;
    this.viaturas = null;
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
    } finally { }
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
  logout() {
    this.authService.logout();
  }

}

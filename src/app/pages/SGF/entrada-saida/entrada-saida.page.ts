import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EntradaSaida } from 'src/app/models/entrada-saida';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { StorageService } from 'src/app/services/storage.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { Subscription } from 'rxjs';
import { TipoEntradaSaida } from 'src/app/models/tipo-entrada-saida.enum';
import { EntradaSaidaDTO } from 'src/app/models/entrada-saida-DTO';

@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.page.html',
  styleUrls: ['./entrada-saida.page.scss'],
})
export class EntradaSaidaPage implements OnInit {

  
  public viaturas: ViaturaDTO[];
  public loading;
  public viaturasPatio: EntradaSaida[];
  public viaturasLocal: EntradaSaidaDTO[];
  situacaoViatura;
  public upm: string;
  public page: string;
  public paginator: number = 0;
  public paginatorUpmLocal: number = 0;
  public busca: string;
  private subscribeUser: Subscription;
  private subscribePatio: Subscription;
  private subscribeUpmLocal: Subscription;
  tipoEntradaSaida;

  constructor(
    public authService: AuthService,
    public viaturaService: ViaturaService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private route: ActivatedRoute,
    public storage: StorageService,
    public policialService: PolicialService) {
    this.situacaoViatura = SituacaoViatura;
    this.tipoEntradaSaida = TipoEntradaSaida;
     }

  ngOnInit() {
    this.getPolicial();
    this.page = 'patio'
    this.getPatio();

    // let date = new Date();
    // console.log(date.toUTCString())
    // this.policialService.testefiltro(date.toUTCString())
    //   .subscribe(response => {
    //     console.log(response)
    //   })
  }

  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
     this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          this.upm = response.lotacao;
        },
        error => {}
        );
    }
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'patio') {
      this.getPatioClick();
      this.page = 'patio'
    } else {
      this.getViaturasPatioUpmLocal();
      this.page = 'upm'
    }
  }

  logout() {
    this.authService.logout();
  }

  viaturasPesquisa(event) {
    this.viaturas = event;
    console.log(this.viaturas)
  }

  buscaPesquisa(event) {
    this.busca = event;
  }

  getPatio() {
   this.subscribePatio = this.route.data.subscribe((resolvedRouteData) => {
     this.viaturasPatio = resolvedRouteData.data.content;
     console.log(this.viaturasPatio)
    },
    (error) => {});
  }

  getPatioLoading() {
    this.subscribePatio = this.viaturaService.getPatio(this.paginator)
      .subscribe(response => {
        if (this.viaturasPatio != null) {
          console.log('entrando no if')
          this.viaturasPatio = this.viaturasPatio.concat(response['content']);
        } else {
          console.log('entrando no else')
          this.viaturasPatio = response['content'];
        }
        console.log(this.viaturasPatio);
    },
    (error) => {});
  }

  getPatioClick() {
    this.paginator = 0;
    this.subscribePatio = this.viaturaService.getPatio(this.paginator)
      .subscribe(response => {
          this.viaturasPatio = response['content'];
        console.log(this.viaturasPatio);
    },
    (error) => {});
  }

  getViaturasPatioUpmLocalLoading() {
    this.subscribeUpmLocal = this.viaturaService.getViaturasPatioUpmLocal(this.paginatorUpmLocal)
      .subscribe(response => {
        this.viaturasLocal = this.viaturasLocal.concat(response);
        console.log(this.viaturasLocal);
    },
    (error) => {});
  }

  getViaturasPatioUpmLocal() {
    this.paginatorUpmLocal = 0;
    this.subscribeUpmLocal = this.viaturaService.getViaturasPatioUpmLocal(this.paginatorUpmLocal)
      .subscribe(response => {
        this.viaturasLocal = null;
        this.viaturasLocal = response;
        console.log(response);
    },
    (error) => {});
  }


  async presentAlertConfirmeEntrada(viatura: ViaturaDTO) {
    console.log(viatura)
    const alert = await this.alertController.create({
      header: 'Confirme!',
      message: `Confirma a ENTRADA da viatura <strong>${viatura.marca} ${viatura.modelo}</strong>, placa <strong>${viatura.placa}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.entradaViatura(viatura);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmSaida(viatura: ViaturaDTO) {
    console.log(viatura)
    const alert = await this.alertController.create({
      header: 'Confirme!',
      message: `Confirma a SAÍDA da viatura <strong>${viatura.marca} ${viatura.modelo}</strong>, placa <strong>${viatura.placa}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.saidaViatura(viatura);
          }
        }
      ]
    });

    await alert.present();
  }


  async entradaViatura(viatura: ViaturaDTO) {
    await this.presentLoading();
    try {
      await this.viaturaService.entradaViatura(parseInt(viatura.id))
      .subscribe(response => {
        console.log(response);
        this.loading.dismiss();
        this.toastViaturaPatio(viatura);
        this.viaturasPatio.push(response);
        this.viaturas.length = 0;
        this.getViaturasPatioUpmLocal();
      }, error => this.loading.dismiss())
    } catch (error) {
        this.loading.dismiss();
    }
    
  }

  async saidaViatura(viatura: ViaturaDTO) {
    await this.presentLoading();
    try {
      await this.viaturaService.saidaViatura(parseInt(viatura.id))
      .subscribe(response => {
        this.paginator = 0;
        this.viaturasPatio = null;
        this.getPatioClick();
        this.loading.dismiss();
        this.toastViaturaSaiu(viatura);

      }, error => this.loading.dismiss())
    } catch (error) {
        this.loading.dismiss();
    }
    
  }

  async toastViaturaPatio(viatura: ViaturaDTO) {
    const toast = await this.toastController.create({
      message: `Viatura <strong>${viatura.marca} ${viatura.modelo}</strong>, placa <strong>${viatura.placa}</strong> no pátio`,
      duration: 2000
    });
    toast.present();
  }

  async toastViaturaSaiu(viatura: ViaturaDTO) {
    const toast = await this.toastController.create({
      message: `Viatura <strong>${viatura.marca} ${viatura.modelo}</strong>, placa <strong>${viatura.placa}</strong> saiu do pátio`,
      duration: 2000
    });
    toast.present();
  }

  loadPatio(event) {
    setTimeout(() => {
      console.log('Done');
      this.paginator++;
      this.getPatioLoading();
      console.log(this.paginator)
      event.target.complete();
      if (this.viaturasPatio.length < 0) {
        event.target.disabled = true;
      }
    }, 500);
  }

  loadUpmLocal(event) {
    setTimeout(() => {
      console.log('Done');
      this.paginatorUpmLocal++;
      this.getViaturasPatioUpmLocalLoading();
      console.log(this.paginatorUpmLocal)
      event.target.complete();
      if (this.viaturasPatio.length < 0) {
        event.target.disabled = true;
      }
    }, 500);
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
      mode: 'ios'
    });
    return this.loading.present();
  }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
    if (!this.subscribePatio.closed) { this.subscribePatio.unsubscribe(); }
    if (!this.subscribeUpmLocal.closed) { this.subscribeUpmLocal.unsubscribe(); }
  }
}

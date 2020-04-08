import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EntradaSaida } from 'src/app/models/entrada-saida';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';

@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.page.html',
  styleUrls: ['./entrada-saida.page.scss'],
})
export class EntradaSaidaPage implements OnInit {

  
  public viaturas: ViaturaDTO[];
  public loading;
  public viaturasPatio: EntradaSaida[];
  situacaoViatura;
  public upm: string;
  public tipo = 'patio';

  constructor(
    public authService: AuthService,
    public viaturaService: ViaturaService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private route: ActivatedRoute) {
    this.situacaoViatura = SituacaoViatura;
     }

  ngOnInit() {
    this.getPatio();
  }

  logout() {
    this.authService.logout();
  }

  viaturasPesquisa(event) {
    this.viaturas = event;
    console.log(this.viaturas)
  }

  getPatio() {
    this.route.data.subscribe((resolvedRouteData) => {

      this.viaturasPatio = resolvedRouteData.data;
      this.upm = this.viaturasPatio[0].unidadePolicialDTO.sigla;
      console.log(this.viaturasPatio);
    },
    (error) => {});
  }

  getPatioClick() {
    this.tipo = 'patio'
    this.viaturaService.getPatio()
      .subscribe(response => {
        this.viaturasPatio = response;
        console.log(this.viaturasPatio);
    },
    (error) => {});
  }

  getViaturasPatioUpmLocal() {
    this.tipo = 'upmLocal'
    this.viaturaService.getViaturasPatioUpmLocal()
      .subscribe(response => {
        this.viaturasPatio = response;
        console.log(response);
    },
    (error) => {});
  }


  async presentAlertConfirm(viatura: ViaturaDTO) {
    console.log(viatura)
    const alert = await this.alertController.create({
      header: 'Confirme!',
      message: `Confirma a entrada da viatura <strong>${viatura.marca} ${viatura.modelo}</strong>, placa <strong>${viatura.placa}</strong>?`,
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
            this.entradaSaida(viatura);
          }
        }
      ]
    });

    await alert.present();
  }


  async entradaSaida(viatura: ViaturaDTO) {
    await this.presentLoading();
    try {
      await this.viaturaService.entradaSaida(parseInt(viatura.id))
      .subscribe(response => {
        console.log(response);
        this.loading.dismiss();
        this.toastViaturaPatio(viatura);
        this.viaturasPatio.push(response);
        this.viaturas.length = 0;

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

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
      mode: 'ios'
    });
    return this.loading.present();
  }

}

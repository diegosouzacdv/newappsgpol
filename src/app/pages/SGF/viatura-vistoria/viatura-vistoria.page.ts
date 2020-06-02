import { Component, OnInit, ɵConsole } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { Subscription } from 'rxjs';
import { VistoriaVistoriaDTO } from 'src/app/models/vistoria-viatura.dto';
import { ItensVistoria } from 'src/app/models/itens-vistoria';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viatura-vistoria',
  templateUrl: './viatura-vistoria.page.html',
  styleUrls: ['./viatura-vistoria.page.scss'],
})
export class ViaturaVistoriaPage implements OnInit {

  viatura: ViaturaDTO;
  vistoria: VistoriaVistoriaDTO;
  idViatura: string;
  teste = 'oleo';
  localizacao: any;
  adjunto = 'false';
  loading: any;
  situacaoViatura;
  fotosSlides: string = '';
  mostrarItens: boolean = true;
  subscribeVistoria: Subscription;
  subscribeInvalidarVistoria: Subscription;
  subscribeSalvarAdjunto: Subscription;
  subscribeItensVistoria: Subscription;
  subscribeBuscarVistoria: Subscription;
  subscribeReceberViaturaRouter: Subscription;
  subscribeInserirItemVistoria: Subscription;
  subscribeInvalidarVistoriavar: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itensVistoriaService: ItensVistoriaService,
    private loadingController: LoadingController,
    private policialService: PolicialService,
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public authService: AuthService) {

    this.situacaoViatura = SituacaoViatura;

    this.idViatura = this.activatedRoute.snapshot.paramMap.get('id');
    this.adjunto = this.activatedRoute.snapshot.paramMap.get('adjunto');

    this.resolverViatura();
    this.ResolveTemViaturaVistoria();

  }

  ngOnInit() {
    this.vistoria = {
      odometro: 0,
      nivelCombustivel: '',
      observacaoMotorista: '',
      vistoriaViaturaItensVistoria: []
    }
  }

  public ResolveTemViaturaVistoria() {
    this.route.data.subscribe((resolvedRouteData) => {
      console.log(resolvedRouteData.temVistoria)
      if (resolvedRouteData.temVistoria.idVistoria === null) {
        this.inserirInicioVistoria(this.idViatura);
      } else {
        this.getVistoria();
      }
    })
  }

  public resolverViatura() {
    this.subscribeBuscarVistoria = this.route.data.subscribe((resolvedRouteData) => {
      this.viatura = resolvedRouteData.viatura;
      console.log(this.viatura)
    })
  }

  public getVistoria() {
    this.subscribeBuscarVistoria = this.itensVistoriaService.buscarVistoria(this.idViatura)
      .subscribe(response => {
        console.log(response)
        this.vistoria = response;
      });
  }

  public abrirSlidesFotos(nome: string) {
    if (this.fotosSlides == '') {
      this.fotosSlides = nome;
    } else if (this.fotosSlides == nome) {
      this.fotosSlides = '';
    } else {
      this.fotosSlides = nome;
    }
  }

  recebeItem(item: ItensVistoria) {
    console.log(item)
    this.subscribeInserirItemVistoria = this.itensVistoriaService.inserirItem(item.id)
      .subscribe(response => {
        this.fotosSlides = '';
        this.vistoria.vistoriaViaturaItensVistoria.forEach(element => {
          if (element.id == item.id) {
            element.vistoriaOk = response.vistoriaOk;
          }
        });
      });
  }

  async enviarVistoria() {
    this.vistoria.dataVistoria = null;
    this.vistoria.vistoriaViaturaItensVistoria = null;
    if (this.vistoria.odometroFinal != null && (this.vistoria.odometroFinal < this.vistoria.odometro)) {
      let alert = {
        header: 'Odômetro Final',
        body: 'Odômetro Final é menor que Odômetro Inicial'
      }
      this.alertOdometro(alert);
    } else {
      await this.presentLoading();
      try {
        console.log(this.vistoria)
        this.subscribeItensVistoria = this.itensVistoriaService.updateVistoria(this.vistoria)
          .subscribe(response => {
            console.log(response)
            this.loading.dismiss();
            
            this.success();
          }, (errors => {
            this.loading.dismiss();
            this.router.navigate(['/viatura-motorista']);
          }));
      } finally {}
    }
  }

  async inserirInicioVistoria(idViatura) {
    console.log('itens a inserir')
    await this.presentLoading();
    try {
      this.subscribeVistoria = this.itensVistoriaService.inserirVistoria(parseInt(idViatura))
        .subscribe(response => {
          console.log(response)
          this.getVistoria();
          this.viatura.status = 'EM VISTORIA';
          this.loading.dismiss();
        }, (errors => {
          this.loading.dismiss();
        }));
    } finally { }
  }

  public async invalidarVistoria(vistoria: VistoriaVistoriaDTO) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Deseja excluir a vistoria?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Sim',
          handler: async () => {
            await this.presentLoading();
            this.subscribeInvalidarVistoria = this.itensVistoriaService.invalidarVistoria(vistoria)
              .subscribe(response => {
                this.loading.dismiss();
                console.log(response);
                this.excluido();
              }, error => {
                this.loading.dismiss();
              });
          }
        }
      ]
    });
    await alert.present();
  }

  public async salvarAdjunto(vistoria: VistoriaVistoriaDTO) {
    if (vistoria.odometroFinal != null && (vistoria.odometroFinal < vistoria.odometro)) {
      let alert = {
        header: 'Odômetro Final',
        body: 'Odômetro Final é menor que Odômetro Inicial'
      }
      this.alertOdometro(alert);
    } else if (this.viatura.status === 'CAUTELADA' && (vistoria.odometroFinal === null || isNaN(vistoria.odometroFinal)) && this.adjunto) {
      let alert = {
        header: 'Odômetro Final',
        body: 'Não é possivel receber a viatura com o odômetro final zerado!'
      }
      this.alertOdometro(alert);
    } else {
      await this.presentLoading();
      try {
        this.subscribeSalvarAdjunto = this.itensVistoriaService.salvarVisaoAdjunto(vistoria)
          .subscribe(response => {
            console.log(response);
            this.loading.dismiss();
            this.success();
          }, (errors => {
            this.loading.dismiss();
          }));
      } finally {
      }
    }
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
      mode: 'ios'
    });
    return this.loading.present();
  }

  public success() {
    const alert = this.alertCtrl.create({
      header: 'Sucesso',
      message: 'Salvo com sucesso!',
      backdropDismiss: true,
      buttons: [
        { text: 'Ok' }
      ]
      // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => {
      alert.present();
      if (this.adjunto === 'true') {
        this.router.navigate(['/adjunto']);
      } else {
        this.router.navigate(['/viatura-motorista']);
      }
    });
  }

  public alertOdometro(alerta) {
    const alert = this.alertCtrl.create({
      header: alerta.header,
      message: alerta.body,
      backdropDismiss: true,
      buttons: [
        { text: 'Ok' }
      ]
      // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => { alert.present(); });
  }

  public excluido() {
    const alert = this.alertCtrl.create({
      header: 'Excluido',
      message: 'Vistoria foi excluida!',
      backdropDismiss: true,
      buttons: [
        { text: 'Ok' }
      ]
      // tslint:disable-next-line: no-shadowed-variable
    }).then(alert => {
      alert.present()
      if (this.adjunto === 'true') {
        this.router.navigate(['/adjunto']);
      } else {
        this.router.navigate(['/viatura-motorista']);
      }
    });
  }

  ionViewWillLeave() {
    if (!this.subscribeVistoria.closed) { this.subscribeVistoria.unsubscribe(); }
    if (!this.subscribeInvalidarVistoria.closed) { this.subscribeInvalidarVistoria.unsubscribe(); }
    if (!this.subscribeItensVistoria.closed) { this.subscribeItensVistoria.unsubscribe(); }
    if (!this.subscribeBuscarVistoria.closed) { this.subscribeBuscarVistoria.unsubscribe(); }
    if (!this.subscribeReceberViaturaRouter.closed) { this.subscribeReceberViaturaRouter.unsubscribe(); }
    if (!this.subscribeInserirItemVistoria.closed) { this.subscribeInserirItemVistoria.unsubscribe(); }
    if (!this.subscribeInvalidarVistoriavar.closed) { this.subscribeInvalidarVistoriavar.unsubscribe(); }
  }

  logout() {
    this.authService.logout();
  }
}

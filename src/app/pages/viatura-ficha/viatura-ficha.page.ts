import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { Subscription } from 'rxjs';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viatura-ficha',
  templateUrl: './viatura-ficha.page.html',
  styleUrls: ['./viatura-ficha.page.scss'],
})
export class ViaturaFichaPage implements OnInit {

  viatura: ViaturaDTO;
  temVistoria: boolean = false;
  adjunto = 'false'
  situacaoViatura;
  private subscribeViaturaFicha: Subscription;
  private subscribeItensVistoria: Subscription;
  private subscribeViaturaVistoria: Subscription;
  public temVistoriaViatura;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itensVistoriaService: ItensVistoriaService,
    public alertController: AlertController,
    public viaturaService: ViaturaService) {



    this.situacaoViatura = SituacaoViatura;

    this.subscribeViaturaFicha = this.route.data.subscribe((resolvedRouteData) => {
      this.isVistoria(resolvedRouteData.isVistoria)
      if (resolvedRouteData.viatura) {
        this.viatura = resolvedRouteData.viatura;
        this.getViaturaVistoria(resolvedRouteData.viaturaVistoria);
      } else {
        if (this.adjunto !== 'true') {
          this.router.navigate(['/viatura-motorista'])
        } else {
          this.router.navigate(['/adjunto'])
        }
      }
    })
    this.adjunto = this.route.snapshot.paramMap.get('adjunto');
    console.log(this.route.snapshot.paramMap.get('adjunto'))
  }

  getViaturaVistoria(response) {
    this.temVistoriaViatura = response;
    this.temVistoriaViatura.forEach(element => {
      if (element.placa == this.viatura.placa) {
        this.temVistoriaViatura = null;
        this.temVistoriaViatura = element;
      }
    });
    console.log(this.temVistoriaViatura)
  }

  async naoPodeAbrirVistoria() {
    const alert = await this.alertController.create({
      subHeader: 'Já existe Vistoria',
      message: 'finalize vistoria anterior para prosseguir',
      buttons: ['OK']
    });
    await alert.present();
  }

  vistoriar(viatura: ViaturaDTO) {
    this.router.navigate(['/vistoria', viatura.id, this.temVistoria, this.adjunto])
  }

  public isVistoria(response) {
    console.log(response)
    if (response != null && response.id !== 0) {
      this.temVistoria = true;
    }
    console.log(this.temVistoria)
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    if (!this.subscribeViaturaFicha.closed) { this.subscribeViaturaFicha.unsubscribe(); }
    if (!this.subscribeItensVistoria.closed) { this.subscribeItensVistoria.unsubscribe(); }
    if (!this.subscribeViaturaVistoria.closed) { this.subscribeViaturaVistoria.unsubscribe(); }
  }

}

import { Component } from '@angular/core';
import { EfetivoUnidadeDTO } from '../models/efetivo.dto';
import { EfetivoUnidadeService } from '../services/domain/efetivo.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from '../services/storage.service';
import { PolicialService } from '../services/domain/policial.service';
import { PolicialDTO } from '../models/policial.dto';
import { FichaPolicialPage } from '../pages/ficha-policial/ficha-policial.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public loading;
  public efetivoUnidade: EfetivoUnidadeDTO;
  public policial: PolicialDTO;
  private subscribeUser: Subscription;
  private subscribeEfetivo: Subscription;

  constructor(
    private efetivoUnidadeService: EfetivoUnidadeService,
    public modalController: ModalController,
    private loadingController: LoadingController,
    private storage: StorageService,
    public policialService: PolicialService, ) { }

  ngOnInit() {
    this.getPolicial();

  }

  async getPolicial() {
    await this.presentLoading();
    try {
      let localUser = this.storage.getLocalUser();
      if (localUser && localUser.id) {
        this.subscribeUser = this.policialService.usuarioLogado()
          .subscribe(response => {
            this.policial = response;
            console.log(this.policial);
            this.buscarEfetivo();
            this.loading.dismiss();
          },
            error => {this.loading.dismiss(); }
          );
      }
    } finally { }
    }

  buscarEfetivo() {
    this.subscribeEfetivo = this.efetivoUnidadeService.buscarEfetivo(this.policial.lotacaoCodigo)
      .subscribe(res => {
        this.efetivoUnidade = res[API_CONFIG.content];
        console.log(this.efetivoUnidade);
      });
  }

  async presentModal(policial: PolicialDTO) {
    const modal = await this.modalController.create({
      component: FichaPolicialPage,
      componentProps: {
        'policial': policial
      }
    });
    return await modal.present();
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
    if (!this.subscribeEfetivo.closed) { this.subscribeEfetivo.unsubscribe(); }
  }

}

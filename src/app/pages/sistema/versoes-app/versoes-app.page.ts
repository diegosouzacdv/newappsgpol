import { Component, OnInit } from '@angular/core';
import { VersaoAppService } from 'src/app/services/domain/versao-app.service';
import { Versao } from 'src/app/models/versao/versao';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { InserirVersaoPage } from '../inserir-versao/inserir-versao.page';

@Component({
  selector: 'app-versoes-app',
  templateUrl: './versoes-app.page.html',
  styleUrls: ['./versoes-app.page.scss'],
})
export class VersoesAppPage implements OnInit {

  public versoes: Versao[];
  private page = 0;
  private versoesSbubscribe: Subscription;

  constructor(
    public versaoAppService: VersaoAppService,
    public route: ActivatedRoute,
    public modalController: ModalController) { }

  ngOnInit() {
    this.getVersoes();
  }

  async criandoVersao() {
    const modal = await this.modalController.create({
      component: InserirVersaoPage
    });
    return (await modal).present();
  }

  getVersoes() {
  this.page = 0;
   this.versoesSbubscribe = this.route.data.subscribe(response => {
      this.versoes = response.data.content;
    })
  }

  getVersoesLoading() {
    this.versoesSbubscribe = this.versaoAppService.buscarVersoes(this.page)
      .subscribe(response => {
        this.versoes = this.versoes.concat(response['content']);
      })
  }

  loadVersoes(event) {
    setTimeout(() => {
      console.log('Done');
      this.page++;
      this.getVersoesLoading();
      event.target.complete();
    }, 500);
  }

  ionViewWillLeave() {
    if (!this.versoesSbubscribe.closed) { this.versoesSbubscribe.unsubscribe(); }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.getVersoes();
      event.target.complete();
    }, 2000);
  }

}

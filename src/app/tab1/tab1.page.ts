import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PolicialDTO } from '../models/policial.dto';
import { PolicialService } from '../services/domain/policial.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalizacaoDTO } from '../models/localizacao.dto';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private subscribeUser: Subscription;
  public policial: PolicialDTO;
  public localizacao: LocalizacaoDTO;

  constructor(
    private route: ActivatedRoute,
    public policialService: PolicialService) {}

  public resolverUser() {
    this.subscribeUser = this.route.data.subscribe((resolvedRouteData) => {
      this.policial = resolvedRouteData['data'];
      this.policialService.getLocalization();
    });
  }

  async ionViewWillEnter() {
    this.resolverUser();

  }

  ionViewWillLeave() {
    this.subscribeUser.unsubscribe();
  }

}

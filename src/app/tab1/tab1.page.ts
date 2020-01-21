import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PolicialDTO } from '../models/policial.dto';
import { PolicialService } from '../services/domain/policial.service';
import { LocalizacaoDTO } from '../models/localizacao.dto';
import { AuthService } from '../services/auth.service';

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
    public policialService: PolicialService,
    public authService: AuthService) {}

  public resolverUser() {
    this.subscribeUser = this.policialService.usuarioLogado()
    .subscribe((response) => {
      this.policial = response;
    });
  }

  // ngOnInit() {
  //   this.resolverUser();
  // }

  async ionViewWillEnter() {
    this.resolverUser();
  }

  refreshToken() {
    this.authService.refreshToken()
      .subscribe(response => {
        console.log(response);
      });
  }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
  }

}

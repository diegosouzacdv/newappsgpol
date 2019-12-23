import { Component, OnInit } from '@angular/core';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { Subscription } from 'rxjs';
import { PolicialDTO } from 'src/app/models/policial.dto';

@Component({
  selector: 'app-dados-basico-policial',
  templateUrl: './dados-basico-policial.component.html',
  styleUrls: ['./dados-basico-policial.component.scss'],
})
export class DadosBasicoPolicialComponent implements OnInit {

  private subscribeUser: Subscription;
  public policial: PolicialDTO;

  constructor(
    public policialService: PolicialService) {
      this.resolverUser();
     }

  ngOnInit() {}

  public resolverUser() {
    this.subscribeUser = this.policialService.usuarioLogado()
    .subscribe((response) => {
      this.policial = response;
      this.policialService.getLocalization();
    });
  }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) this.subscribeUser.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { Subscription } from 'rxjs';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { NavigationExtras, Router } from '@angular/router';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';

@Component({
  selector: 'app-adjunto',
  templateUrl: './adjunto.page.html',
  styleUrls: ['./adjunto.page.scss'],
})
export class AdjuntoPage {

  private subscribeUser: Subscription;
  private subscribeViaUni: Subscription;
  private subscribeVistoria: Subscription;
  public policial: PolicialDTO;
  viaturasUnidade: ViaturaDTO[] = [];
  adjunto = true;
  temVistoria = false;
  situacaoViatura;

  constructor(
    private storage: StorageService,
    public router: Router,
    public policialService: PolicialService,
    public viaturaService: ViaturaService,
    private itensVistoriaService: ItensVistoriaService) {
      this.situacaoViatura = SituacaoViatura;
     }

  // ngOnInit() {
  //  this.getPolicial();
  // }

  ionViewWillEnter() {
    this.getPolicial();
  }

  listarViaturasUnidade() {
      this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo)
        .subscribe(response => {
          console.log(response)
          this.viaturasUnidade = response['content'];
        });
  }

  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
      this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          this.policial = response;
          console.log(this.policial);
          this.listarViaturasUnidade();
        },
        error => {}
        );
    }
  }

  fichaViatura(viatura: ViaturaDTO) {
    let navExtras: NavigationExtras = {
      state: {
        viatura: viatura
      }
    };
    this.router.navigate([`/viatura-ficha/${this.adjunto}`], navExtras);
  }

  public async isVistoria(viatura) {
    console.log(viatura)
    try{
      this.subscribeVistoria = this.itensVistoriaService.buscarVistoria(viatura.id)
        .subscribe(response => {
          console.log(response)
          if (response != null) {
            this.temVistoria = true;
            const navExtras: NavigationExtras = {
              state: {
                viatura
              }
            };
            this.router.navigate(['/vistoria', viatura.id, this.temVistoria, this.adjunto], navExtras);
          }
        });
    } finally {}
    }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
    if (!this.subscribeViaUni.closed) { this.subscribeViaUni.unsubscribe(); }
    if (!this.subscribeVistoria.closed) { this.subscribeVistoria.unsubscribe(); }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.listarViaturasUnidade();
      event.target.complete();
    }, 2000);
  }

}

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { Subscription } from 'rxjs';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { AuthService } from 'src/app/services/auth.service';

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
  semViaturas = false;
  private page: number = 0;

  constructor(
    private storage: StorageService,
    public router: Router,
    public policialService: PolicialService,
    public viaturaService: ViaturaService,
    private itensVistoriaService: ItensVistoriaService,
    private route: ActivatedRoute,
    public authService: AuthService) {
      this.situacaoViatura = SituacaoViatura;
      console.log(this.viaturasUnidade)
     }

  ngOnInit() {
   this.getPolicial();
  }

  ionViewWillEnter() {
    this.listarViaturasUnidade();
    this.page = 0;
  }

  listarViaturasUnidade() {
      this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
        .subscribe(response => {
          console.log(response)
          this.viaturasUnidade = response['content'];
          if (this.viaturasUnidade.length == 0 ) {
            console.log('entrando aq sem viaturas')
            this.semViaturas = true;
          }
        });
  }

  listarViaturasUnidadeLoading() {
    this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
      .subscribe(response => {
        console.log(response)
        this.viaturasUnidade.concat(response['content']);
        if (this.viaturasUnidade.length == 0 ) {
          console.log('entrando aq sem viaturas')
          this.semViaturas = true;
        }
      });
}

  getPolicial() {
    this.subscribeUser = this.route.data.subscribe((resolvedRouteData) => {
      this.policial = resolvedRouteData.policial;
    })
  }

  fichaViatura(viatura: ViaturaDTO) {
    let navExtras: NavigationExtras = {
      state: {
        viatura: viatura
      }
    };
    this.router.navigate([`/viatura-ficha/${viatura.id}/${this.adjunto}`], navExtras);
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

  loadViaturasUnidade(event) {
    setTimeout(() => {
      console.log('Done');
      this.page++;
      this.listarViaturasUnidadeLoading();
      event.target.complete();
      if (this.viaturasUnidade.length < 0) {
        event.target.disabled = true;
      }
    }, 500);
  }

  
  logout() {
    this.authService.logout();
  }

}

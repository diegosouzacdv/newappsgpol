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
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adjunto',
  templateUrl: './adjunto.page.html',
  styleUrls: ['./adjunto.page.scss'],
})
export class AdjuntoPage {

  private subscribeUser: Subscription;
  public viaturas: ViaturaDTO[];
  private subscribeViaUni: Subscription;
  private subscribeVistoria: Subscription;
  private subscribeTemVistoria: Subscription;
  public policial: PolicialDTO;
  viaturasUnidade: ViaturaDTO[] = [];
  adjunto = true;
  situacaoViatura;
  semViaturas = false;
  private page: number = 0;
  public quantPagina: number = 3;
  public busca: string;
  public isAdmin = false;

  constructor(
    public alertController: AlertController,
    private storage: StorageService,
    public router: Router,
    public policialService: PolicialService,
    public viaturaService: ViaturaService,
    private itensVistoriaService: ItensVistoriaService,
    public authService: AuthService) {
    this.situacaoViatura = SituacaoViatura;
    this.storage.getLocalUser().authorities.forEach(element => {
      if (element === 'ROLE_APP_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  ngOnInit() {

  }

  buscaPesquisa(event) {
    this.busca = event;
  }

  ionViewWillEnter() {
    setTimeout( () => {
      this.listarViaturasUnidade();
    }, 300)
    this.page = 0;
  }

  listarViaturasUnidade() {
    this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
      .subscribe(response => {
        this.viaturasUnidade = response['content'];
        this.viaturasUnidade.forEach(viatura => {
          this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
            .subscribe(response => {
              viatura.viaturaTemVistoria = response;
            })
        })

        console.log(this.viaturasUnidade)

        if (this.viaturasUnidade.length == 0) {
          console.log('entrando aq sem viaturas')
          this.semViaturas = true;
        }
      });
  }

  listarViaturasUnidadeLoading() {
    this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
      .subscribe(response => {
        console.log(response)
        this.viaturasUnidade = this.viaturasUnidade.concat(response['content']);

        console.log(this.viaturasUnidade)
        if (this.viaturasUnidade.length == 0) {
          console.log('entrando aq sem viaturas')
          this.semViaturas = true;
        }
      });
  }

  public async isVistoria(viatura: ViaturaDTO) {
    if (viatura.viaturaTemVistoria != null && viatura.viaturaTemVistoria.motoristaMatricula === this.policial.matricula) {
      this.naoPermitido(viatura)
    } else 
    if(viatura.viaturaTemVistoria != null) {
      this.router.navigate(['/vistoria', viatura.id, this.adjunto]);
    }
  }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
    if (!this.subscribeViaUni.closed) { this.subscribeViaUni.unsubscribe(); }
    if (!this.subscribeVistoria.closed) { this.subscribeVistoria.unsubscribe(); }
    if (!this.subscribeTemVistoria.closed) { this.subscribeTemVistoria.unsubscribe(); }

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
      this.page++;
      console.log(this.page);
      this.listarViaturasUnidadeLoading();
      event.target.complete();
      if (this.viaturasUnidade.length < 0) {
        event.target.disabled = true;
      }
    }, 500);
  }

  isViaturaVistoria(viaturas: ViaturaDTO[]) {
    this.viaturas = viaturas;
    if (this.viaturas != null) {
      this.viaturas.forEach(viatura => {
        this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
          .subscribe(response => {
            viatura.viaturaTemVistoria = response;
          })
      })
    }
  }

  async naoPermitido(viatura: ViaturaDTO) {
    const alert = await this.alertController.create({
      subHeader: 'Não permitido',
      message: this.texto(viatura),
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
  }

  texto(viatura: ViaturaDTO) {
    return `<strong>${this.policial.posto} ${this.policial.nomeGuerra}</strong> é motorista da viatura <strong>${viatura.marca} ${viatura.modelo} prefixo: ${viatura.prefixo}</strong> e não pode proceder como ADJUNTO`
  }


  logout() {
    this.authService.logout();
  }

}

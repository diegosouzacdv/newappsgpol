import { Component, OnChanges } from '@angular/core';
import { ViaturaDTO } from '../models/viatura.dto';
import { PolicialDTO } from '../models/policial.dto';
import { ItensVistoriaService } from '../services/domain/itens-vistoria.service';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { PolicialService } from '../services/domain/policial.service';
import { Router, NavigationExtras } from '@angular/router';
import { ViaturaService } from '../services/domain/viatura.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss',]
})
export class Tab2Page {

  viaturas: ViaturaDTO[];
  viaturasUnidade: ViaturaDTO[] = [];
  viatura: ViaturaDTO;
  public policial: PolicialDTO;
  public page: number = 0;
  public busca: string = ''
  showCard = false;
  showViaturaUnidade = false;
  private subscribeUser: Subscription;
  private subscribeViaUni: Subscription;
  private subscribeViaId: Subscription;
  private subscribeVistoria: Subscription;
  private subscribePesquisa: Subscription;
  adjunto = false;

  constructor(
    public navCtrl: NavController,
    public viaturaService: ViaturaService,
    public router: Router,
    public policialService: PolicialService,
    public storage: StorageService,
    public alertController: AlertController,
    public itensVistoriaService: ItensVistoriaService,) {
    }
    
    ngOnInit() {
      this.getPolicial();
    }

    ionViewWillEnter() {
      console.log('ionViewWillEnter')
      this.getPolicial();
    }

    getPolicial() {
      let localUser = this.storage.getLocalUser();
      if (localUser && localUser.id) {
       this.subscribeUser = this.policialService.usuarioLogado()
          .subscribe(response => {
            console.log(response)
            this.policial = response;
            this.listarViaturasUnidade();
          },
          error => {});
      }
    }

    consultarViatura() {
      if (this.busca !== '') {
        this.subscribePesquisa = this.viaturaService.pesquisarViatura(3, this.page, this.busca)
            .subscribe(response => {
              console.log(response)
              //Solicitar que a API retorne somente um array e não um objeto
              const vtrs = Object.keys(response).map(content => response[content]);
              this.viaturas = vtrs[0];
              if (vtrs[0].length == 0) {
                this.semViatura(this.busca);
              } else {
                this.showCard = true;
              }
            },
            error => {});
      } else {
        this.viatura = null;
        this.viaturas = null;
        this.vazio();
      }
    }

    listarViaturasUnidade() {
      if (this.policial.lotacaoCodigo != null || this.policial.lotacaoCodigo != undefined) {
        this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo)
          .subscribe(response => {
            console.log(response)
            this.viaturasUnidade = response['content'];
          })
      }
    }

    buscarViatura(viatura: ViaturaDTO, placa: String) {
      this.subscribeViaId = this.viaturaService.buscarViatura(placa)
          .subscribe(response => {
            console.log(response)
            const vtr = Object.keys(response).map(content => response[content]);
  
            let navExtras: NavigationExtras = {
              state: {
                viatura: vtr[0][0]
              }
            };
            this.router.navigate(['/viatura-ficha'], navExtras);
          })
    }

    fichaViatura(viatura: ViaturaDTO) {
      this.viatura = viatura
      let navExtras: NavigationExtras = {
        state: {
          viatura: viatura
        }
      };
      this.router.navigate([`/viatura-ficha/${this.adjunto}`], navExtras);
    }

    async semViatura(placa: string) {
      const alert = await this.alertController.create({
        //header: 'Alert',
        subHeader: 'Viatura não encontrada',
        message: 'O SGF não possui viatura com a placa ' + placa + '!',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async vazio() {
      const alert = await this.alertController.create({
        //header: 'Alert',
        subHeader: 'Campo Pesquisa Vazio',
        message: 'Placa é Obrigatória!',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    ionViewWillLeave() {
      if (!this.subscribeUser.closed) this.subscribeUser.unsubscribe();
      if (!this.subscribeViaUni.closed) this.subscribeViaUni.unsubscribe();
      if (!this.subscribeViaId.closed) this.subscribeViaId.unsubscribe();
      if (!this.subscribeVistoria.closed) this.subscribeVistoria.unsubscribe();
      if (!this.subscribePesquisa.closed) this.subscribePesquisa.unsubscribe();
    }

}

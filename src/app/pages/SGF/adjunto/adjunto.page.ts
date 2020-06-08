import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
import { AlertController, LoadingController, Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-adjunto',
  templateUrl: './adjunto.page.html',
  styleUrls: ['./adjunto.page.scss'],
})
export class AdjuntoPage implements AfterViewInit{

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
  loading: any;
  pageable;
  @ViewChild('square', {static: false}) square: ElementRef;
  anim: Animation;

  constructor(
    public alertController: AlertController,
    private storage: StorageService,
    public router: Router,
    public policialService: PolicialService,
    public viaturaService: ViaturaService,
    private loadingController: LoadingController,
    private itensVistoriaService: ItensVistoriaService,
    public authService: AuthService,
    private animationCTRL: AnimationController) {
    this.situacaoViatura = SituacaoViatura;
    this.storage.getLocalUser().authorities.forEach(element => {
      if (element === 'ROLE_APP_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.anim = this.animationCTRL.create('myanim');
    this.anim
    .addElement(this.square.nativeElement)
    .duration(600)
    .easing('ease-out')
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.01)', opacity: '0.3' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ])
  }

  buscaPesquisa(event) {
    this.anim.play();
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
        this.pageable = response;
        this.viaturasUnidade = response['content'];
        
        this.isTemVistoria();
        if (this.viaturasUnidade.length == 0) {
          console.log('entrando aq sem viaturas')
          this.semViaturas = true;
        }
      });
  }

 

  listarViaturasUnidadeLoading() {
    this.subscribeViaUni = this.viaturaService.listarViaturasUnidade(this.policial.lotacaoCodigo, this.page)
      .subscribe(response => {
        this.pageable = response;
        console.log(this.pageable)
        this.viaturasUnidade = this.viaturasUnidade.concat(response['content']);
        this.isTemVistoria();
        if (this.viaturasUnidade.length == 0) {
          this.semViaturas = true;
        }
      });
  }

  public async isVistoria(viatura: ViaturaDTO) {
    await this.presentLoading();
    try {
    if (viatura.viaturaTemVistoria != null && viatura.viaturaTemVistoria.motoristaMatricula === this.policial.matricula) {
      this.naoPermitido(viatura)
      this.loading.dismiss();
    } else 
    if(viatura.viaturaTemVistoria != null) {
      this.router.navigate(['/vistoria', viatura.id, this.adjunto]);
    }
  } finally{
    //this.router.navigate(['/vistoria', viatura.id, this.adjunto]);
  }

  }

  ionViewDidLeave() {
    this.loading.dismiss();
  }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) { this.subscribeUser.unsubscribe(); }
    if (!this.subscribeViaUni.closed) { this.subscribeViaUni.unsubscribe(); }
    if (!this.subscribeVistoria.closed) { this.subscribeVistoria.unsubscribe(); }
    if (!this.subscribeTemVistoria.closed) { this.subscribeTemVistoria.unsubscribe(); }

  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
      mode: 'ios'
    });
    return this.loading.present();
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
      if (this.pageable.last === true) {
        console.log('final')
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

   isTemVistoria() {
    this.viaturasUnidade.forEach(viatura => {
      this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
        .subscribe(response => {
          viatura.viaturaTemVistoria = response;
        })
    })
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

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { AlertController, NavController } from '@ionic/angular';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';

@Component({
  selector: 'app-pesquisa-viatura',
  templateUrl: './pesquisa-viatura.page.html',
  styleUrls: ['./pesquisa-viatura.page.scss'],
})
export class PesquisaViaturaPage implements OnInit {

  @Input() adjunto;
  @Output() responseImovel = new EventEmitter();

  public viaturas: ViaturaDTO[];
  public pesquisa: Subject<string> = new Subject<string>();
  public via: Observable<ViaturaDTO | ViaturaDTO[]>;
  public busca: string = '';
  public page: number = 0;
  showCard = false;
  situacaoViatura;

  constructor(
    public viaturaService: ViaturaService,
    public alertController: AlertController,
    public navCtrl: NavController) { 
      
    this.situacaoViatura = SituacaoViatura;
    }

  ngOnInit() {
    this.via = this.pesquisa
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((termo: string) => {
           this.viaturas = null;
          this.busca = termo;
          if(termo != '') { return this.viaturaService.pesquisarViatura(3, this.page, this.busca) }
        }),
        catchError((erro) => {
          return of<ViaturaDTO>();
        })
      );
    this.via.subscribe((viaturas: ViaturaDTO[]) => {
      // tslint:disable-next-line: no-string-literal
      console.log(viaturas)
      this.viaturas = viaturas;
      this.responseImovel.emit(this.viaturas);
      if (viaturas.length == 0) {
        this.semViatura(this.busca);
      } else {
        this.showCard = true;
      }
    });
  }

  public async getPesquisa(nome: string) {
    this.pesquisa.next(nome);
  }

  limparPlaca() {
    this.viaturas = null;
    this.responseImovel.emit(this.viaturas);
    this.busca = '';
  }

  async semViatura(placa: string) {
    const alert = await this.alertController.create({
      subHeader: 'Viatura não encontrada',
      message: 'O SGF não possui viatura com a placa <strong>' + placa.toUpperCase() + '</strong>!',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.viaturas = null;
      event.target.complete();
    }, 2000);
  }

  public rotas(id, adjunto) {
    console.log(id, adjunto)
    this.navCtrl.navigateForward([`/viatura-ficha/`, id, adjunto]);
  }

}

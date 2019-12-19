import { Component } from '@angular/core';
import { ViaturaDTO } from '../models/viatura.dto';
import { PolicialDTO } from '../models/policial.dto';
import { ItensVistoriaService } from '../services/domain/itens-vistoria.service';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { PolicialService } from '../services/domain/policial.service';
import { Router } from '@angular/router';
import { ViaturaService } from '../services/domain/viatura.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  viaturas: ViaturaDTO[];
  viaturasUnidade: ViaturaDTO[];
  viatura: ViaturaDTO;
  public policial: PolicialDTO;
  public page: number = 0;
  public busca: string
  showCard = false;
  private subscribeUser: Subscription;

  constructor(
    public navCtrl: NavController,
    public viaturaService: ViaturaService,
    public router: Router,
    public policialService: PolicialService,
    public storage: StorageService,
    public alertController: AlertController,
    public itensVistoriaService: ItensVistoriaService,) {}

    ngOnInit() {

    }

    ionViewWillEnter() {

    }

}

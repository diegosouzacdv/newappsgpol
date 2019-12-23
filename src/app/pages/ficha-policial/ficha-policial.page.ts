import { Component, OnInit, Input } from '@angular/core';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { NavController, ModalController } from '@ionic/angular';
import { PolicialService } from 'src/app/services/domain/policial.service';

@Component({
  selector: 'app-ficha-policial',
  templateUrl: './ficha-policial.page.html',
  styleUrls: ['./ficha-policial.page.scss'],
})
export class FichaPolicialPage implements OnInit {

  @Input() policial: PolicialDTO;

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public policialService: PolicialService) { }

  ngOnInit() {
    console.log(this.policial)
  }

  /*getpolicial() {
    this.policial.nome = `${this.policial.nome} - ${this.policial.posto} ${this.policial.quadro}`
  }*/

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}

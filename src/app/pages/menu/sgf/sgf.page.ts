import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sgf',
  templateUrl: './sgf.page.html',
  styleUrls: ['./sgf.page.scss'],
})
export class SgfPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  public routeMotorista() {
    this.navCtrl.navigateForward([`/viatura-motorista`]);
  }

  public routeAdjunto() {
    this.navCtrl.navigateForward([`/adjunto`]);
  }

  public routeEntradaSaida() {
    this.navCtrl.navigateForward([`/adjunto`]);
  }

}

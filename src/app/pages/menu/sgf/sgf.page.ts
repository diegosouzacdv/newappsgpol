import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sgf',
  templateUrl: './sgf.page.html',
  styleUrls: ['./sgf.page.scss'],
})
export class SgfPage implements OnInit {

  color = 'secondary';

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  public routeMotorista() {
    this.color = 'light'
    this.navCtrl.navigateForward([`/viatura-motorista`]);
  }

  public routeAdjunto() {
    this.color = 'light'
    this.navCtrl.navigateForward([`/adjunto`]);
  }

  public routeEntradaSaida() {
    this.color = 'light'
    this.navCtrl.navigateForward([`/entrada-saida`]);
  }

}

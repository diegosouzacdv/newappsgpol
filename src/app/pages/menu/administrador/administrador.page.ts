import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  color = 'secondary';

  constructor(public navCtrl: NavController) { }

  public routeVersoes() {
    this.color = 'light';
    setTimeout(() => 
      this.navCtrl.navigateForward([`/versoes`]), 100
    )
  }

  ngOnInit() {
  }

}

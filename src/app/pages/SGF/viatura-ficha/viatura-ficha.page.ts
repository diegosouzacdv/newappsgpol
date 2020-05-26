import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { ActivatedRoute } from '@angular/router';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { Subscription } from 'rxjs';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viatura-ficha',
  templateUrl: './viatura-ficha.page.html',
  styleUrls: ['./viatura-ficha.page.scss'],
})
export class ViaturaFichaPage implements OnInit {

  viatura: ViaturaDTO;
  situacaoViatura;
  private subscribeViaturaFicha: Subscription;
  public temVistoriaViatura;

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
    public viaturaService: ViaturaService,
    public authService: AuthService) {

    this.situacaoViatura = SituacaoViatura;

    this.subscribeViaturaFicha = this.route.data.subscribe((resolvedRouteData) => {
      if (resolvedRouteData.viatura) {
        this.viatura = resolvedRouteData.viatura;
        console.log(this.viatura)
      } 
    })
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    if (!this.subscribeViaturaFicha.closed) { this.subscribeViaturaFicha.unsubscribe(); }
  }

  logout() {
    this.authService.logout();
  }

}

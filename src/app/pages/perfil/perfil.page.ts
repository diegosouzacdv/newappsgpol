import { Component, OnInit } from '@angular/core';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { StorageService } from 'src/app/services/storage.service';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss', 
  'perfil.shell.scss'],
})
export class PerfilPage implements OnInit {

  policial: PolicialDTO;
  private subscribeUser: Subscription;

  constructor(
    public storage: StorageService,
    public policialService: PolicialService,) { }

  ngOnInit() {
    this.getPolicial();
  }

  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
     this.subscribeUser = this.policialService.usuarioLogado()
        .subscribe(response => {
          console.log(response)
          this.policial = response;
          this.policial.nome = `${this.policial.nome} - ${this.policial.posto} ${this.policial.quadro}`
          this.policial.rg = `${this.policial.rg} ${this.policial.orgaoexpedidorrg}`
          this.policial.tempoServico.tempoAverbado.total = `${this.policial.tempoServico.tempoAverbado.anos} a - ${this.policial.tempoServico.tempoAverbado.meses} m - ${this.policial.tempoServico.tempoAverbado.dias} d`
        },
        error => {}
        );
    }
  }

  ionViewWillLeave() {
    this.subscribeUser.unsubscribe();
  }

}

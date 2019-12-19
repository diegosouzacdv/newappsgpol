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
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  policial: PolicialDTO;
  private subscribeUser: Subscription;

  constructor(
    public storage: StorageService,
    public policiaService: PolicialService,) { }

  ngOnInit() {
    this.getPolicial();
  }

  getPolicial() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.id) {
     this.subscribeUser = this.policiaService.usuarioLogado()
        .subscribe(response => {
          this.policial = response;
          console.log(this.policial);
        },
        error => {}
        );
    }
  }

  ionViewWillLeave() {
    this.subscribeUser.unsubscribe();
  }

}

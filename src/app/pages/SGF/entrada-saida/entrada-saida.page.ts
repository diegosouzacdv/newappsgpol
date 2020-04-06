import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { ViaturaService } from 'src/app/services/domain/viatura.service';

@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.page.html',
  styleUrls: ['./entrada-saida.page.scss'],
})
export class EntradaSaidaPage implements OnInit {

  
  public viaturas: ViaturaDTO[];

  constructor(
    public authService: AuthService,
    public viaturaService: ViaturaService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  viaturasPesquisa(event) {
    this.viaturas = event;
    console.log(this.viaturas)
    if (this.viaturas != null) {
      this.viaturaService.getEntradasSaidas(this.viaturas[0].id)
        .subscribe(response => {
          console.log(response);
        })
    }
  }


  entradaSaida(idViatura) {
    this.viaturaService.entradaSaida(idViatura)
      .subscribe(response => {
        console.log(response);
      })
  }

}

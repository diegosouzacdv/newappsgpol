import { Component, OnInit } from '@angular/core';
import { VersaoAppService } from 'src/app/services/domain/versao-app.service';
import { Versao } from 'src/app/models/versao/versao';

@Component({
  selector: 'app-versoes-app',
  templateUrl: './versoes-app.page.html',
  styleUrls: ['./versoes-app.page.scss'],
})
export class VersoesAppPage implements OnInit {

  public versoes: Versao[];

  constructor(
    public versaoAppService: VersaoAppService) { }

  ngOnInit() {
    this.getVersoes();
  }

  getVersoes() {
    this.versaoAppService.buscarVersoes()
      .subscribe(response => {
        this.versoes = response['content'];
        console.log(response);
      })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { DadosResumoPolicial } from 'src/app/models/dados-resumo-policial';
import { UtilsService } from 'src/app/services/domain/utils.service';

@Component({
  selector: 'app-pessoal',
  templateUrl: './pessoal.page.html',
  styleUrls: ['./pessoal.page.scss'],
})
export class PessoalPage implements OnInit {

  @Input() dadosResumoPolicial: DadosResumoPolicial;

  constructor(public utilsService: UtilsService) { }

  ngOnInit() {
    console.log(this.dadosResumoPolicial)
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';

@Component({
  selector: 'app-botao-situacao-viatura',
  templateUrl: './botao-situacao-viatura.component.html',
  styleUrls: ['./botao-situacao-viatura.component.scss'],
})
export class BotaoSituacaoViaturaComponent implements OnInit {

  
  situacaoViatura;
  @Input() viatura: ViaturaDTO;

  constructor() { 
    this.situacaoViatura = SituacaoViatura;
  }

  ngOnInit() {}

}

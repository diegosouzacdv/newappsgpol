import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Pages } from '../models/pages';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public page: Pages[] = [{
    pessoal: {
      nome: 'pessoal',
      ativo: false
    },
    sgf: {
      nome: 'sgf',
      ativo: false
    },
    saude: {
      nome: 'saude',
      ativo: false
    }

  }];

  public pagina = [
    'pessoal',
    'sgf',
    'saude'
  ]

  constructor() { }

  ngOnInit() {
  }

  public changePage(pagina: string) {

    // console.log(this.pagina)
    // console.log(pagina)
    // let pos = this.pagina.indexOf(pagina)
    // console.log(pos)
    // this.pagina.splice(pos, 1)
    // console.log(this.pagina)

    this.page.forEach((element, i) => {
      console.log(i)
      i++;
      //console.log(this.page[i][this.pagina[i]].ativo)
      // if(element[pagina].nome === pagina) {
      //   if (this.page[i][pagina].ativo === false) {
      //     this.page[i][pagina].ativo = true;
      //   } else {
      //     this.page[i][pagina].ativo = false;
      //   }
      // }
    });
  }

  



}


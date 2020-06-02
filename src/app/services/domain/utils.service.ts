import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
 })
export class UtilsService {

   public dataAtualFormatada(date: Date){
      let data = date,
          dia  = data.getDate().toString(),
          diaF = (dia.length == 1) ? '0'+dia : dia,
          mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length == 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
      return anoF+"-"+mesF+"-"+diaF;
  }

  transformarNum(date: string): number {
   // tslint:disable-next-line: radix
   const space = parseInt(date.split('-').join(''));
   return space;
 }

}

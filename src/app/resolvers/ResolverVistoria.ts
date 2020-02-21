import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ViaturaDTO } from '../models/viatura.dto';
import { ItensVistoriaService } from '../services/domain/itens-vistoria.service';


@Injectable()
export class ResolverVistoria implements Resolve<any> {

  constructor(
    public itensVistoriaService: ItensVistoriaService) { }

  resolve(route: ActivatedRouteSnapshot) {
      let id = route.paramMap.get('id');
      console.log(id)
      const dataSource: Observable<ViaturaDTO> = this.itensVistoriaService.buscarVistoria(id);
      console.log(dataSource.subscribe(respose => {console.log(respose)}))
      return dataSource;
            
  }
}
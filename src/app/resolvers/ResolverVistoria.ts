import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ViaturaDTO } from '../models/viatura.dto';
import { ItensVistoriaService } from '../services/domain/itens-vistoria.service';
import { ViaturaTemVistoriaDTO } from '../models/viatura-tem-vistoria.dto';


@Injectable()
export class ResolverVistoria implements Resolve<any> {

  constructor(
    public itensVistoriaService: ItensVistoriaService) { }

  resolve(route: ActivatedRouteSnapshot) {
      let id = route.paramMap.get('id');
      const dataSource: Observable<ViaturaDTO> = this.itensVistoriaService.buscarVistoria(id);
      return dataSource;
            
  }
}

@Injectable({
  providedIn: 'root'
})
export class ResolverViaturaTemVistoria implements Resolve<any> {

  constructor(
    public itensVistoriaService: ItensVistoriaService) { }

  resolve(route: ActivatedRouteSnapshot) {
      let id = route.paramMap.get('id');
      const dataSource: Observable<ViaturaTemVistoriaDTO> = this.itensVistoriaService.isViaturaVistoria(id);
      return dataSource;
            
  }
}
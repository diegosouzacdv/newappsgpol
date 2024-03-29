import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ViaturaService } from '../services/domain/viatura.service';
import { Observable } from 'rxjs';
import { ViaturaDTO } from '../models/viatura.dto';
import { ItensVistoriaService } from '../services/domain/itens-vistoria.service';
import { EntradaSaida } from '../models/entrada-saida';


@Injectable()
export class ResolverViaturaId implements Resolve<any> {

  constructor(
    public viaturaService: ViaturaService) { }

  resolve(route: ActivatedRouteSnapshot) {
      let id = route.paramMap.get('id');
      const dataSource: Observable<ViaturaDTO> = this.viaturaService.buscarViaturaId(id);
      return dataSource;
            
  }
}


@Injectable()
export class ResolverListViaturaEmUso implements Resolve<any> {

  constructor(
    public viaturaService: ViaturaService) { }

  resolve(route: ActivatedRouteSnapshot) {
      const dataSource: Observable<ViaturaDTO[]> = this.viaturaService.getViaturaEmUso();
      return dataSource;
            
  }
}

@Injectable()
export class ResolverTemVistoria implements Resolve<any> {

  constructor(
    private itensVistoriaService: ItensVistoriaService) { }

  resolve(route: ActivatedRouteSnapshot) {
      let id = route.paramMap.get('id');
      console.log(id)
      const dataSource: Observable<any> = this.itensVistoriaService.buscarVistoria(id);
      return dataSource;
            
  }
}

@Injectable({ providedIn: 'root' })
export class ResolverPatio implements Resolve<any> {

  constructor(
    private viaturaService: ViaturaService) { }

  resolve(route: ActivatedRouteSnapshot) {

      const dataSource: Observable<EntradaSaida[]> = this.viaturaService.getPatio(0);
      return dataSource;
  }
}
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ViaturaService } from '../services/domain/viatura.service';
import { Observable } from 'rxjs';
import { ViaturaDTO } from '../models/viatura.dto';


@Injectable({
  providedIn: 'root'
})
export class ResolverViaturaId implements Resolve<any> {

  constructor(
    public viaturaService: ViaturaService) { }

  resolve(route: ActivatedRouteSnapshot) {
      let id = route.paramMap.get('id');
      console.log(id)
      const dataSource: Observable<ViaturaDTO> = this.viaturaService.buscarViaturaId(id);
      return dataSource;
            
  }
}

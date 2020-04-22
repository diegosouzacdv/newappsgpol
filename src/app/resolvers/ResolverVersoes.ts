import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ViaturaDTO } from '../models/viatura.dto';
import { VersaoAppService } from '../services/domain/versao-app.service';
import { Versao } from '../models/versao/versao';


@Injectable({
  providedIn: 'root'
})
export class ResolverVersoes implements Resolve<any> {

  constructor(
    public versaoAppService: VersaoAppService) { }

  resolve() {
      const dataSource: Observable<Versao[]> = this.versaoAppService.buscarVersoes(0);
      return dataSource;
            
  }
}
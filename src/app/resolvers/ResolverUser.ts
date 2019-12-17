import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { PolicialService } from '../services/domain/policial.service';
import { PolicialDTO } from '../models/policial.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ResolverUser implements Resolve<any> {

  constructor(
    public storage: StorageService,
    public policialService: PolicialService,
    public authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<PolicialDTO |Promise<PolicialDTO>| any > {

            const user = this.storage.getLocalUser();
            if (user) {
              return this.policialService.usuarioLogado();
            } else {
              this.authService.logout();
            }
  }
}

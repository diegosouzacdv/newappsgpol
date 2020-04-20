import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PagesService } from '../services/page.service';
import { Pages } from '../models/pages';


@Injectable({
  providedIn: 'root',
})
export class ResolverHome implements Resolve<any> {

  constructor(
    public pagesServices: PagesService) { }

  resolve(route: ActivatedRouteSnapshot) {
      const dataSource: Observable<Pages[]> = this.pagesServices.getListingDataSource();
      return dataSource;
            
  }
}
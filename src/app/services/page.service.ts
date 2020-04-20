import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pages } from '../models/pages';
import { map, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PagesService {


    constructor(private http: HttpClient) {
    }

    public getListingDataSource(): Observable<Pages[]> {
        return this.http.get<Pages[]>('./assets/sample-data/paginas/paginas.json')
        .pipe(map((response: Pages[]) => response), retry(2));
      }

    

}
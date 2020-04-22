import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Versao } from 'src/app/models/versao/versao';

@Injectable({
    providedIn: 'root'
})
export class VersaoAppService {

    constructor(public http: HttpClient) {
    }

    buscarVersoes(page: number): Observable<Versao[]> {
        return this.http.get<Versao[]>(
            `${API_CONFIG.baseUrl}/versao/all?size=10&page=${page}`);
    }

    salvarVersoes(versao: Versao): Observable<Versao> {
        return this.http.post<Versao>(
            `${API_CONFIG.baseUrl}/versao`, versao);
    }
}

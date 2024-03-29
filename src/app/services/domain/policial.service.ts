import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { API_CONFIG } from 'src/app/config/api.config';


@Injectable({
    providedIn: 'root',
})
export class PolicialService {

    constructor(public http: HttpClient,
        public storage: StorageService) {
    }

    testefiltro(data): Observable<any> {
        data = JSON.stringify(data)
        let body = { data };
        return this.http.put<any>(
            `${API_CONFIG.baseUrl}/controle/patio/page/teste`, body);
    }

    usuarioLogado(): Observable<PolicialDTO> {
        return this.http.get<PolicialDTO>(
            `${API_CONFIG.baseUrl}/usuario/curto`);
    }

    dadosResumoPolicial(): Observable<any> {
        return this.http.get<any>(
            `${API_CONFIG.baseUrl}/usuario/dados/resumo`);
    }

    buscarFoto(): Observable<any> {
        return this.http.get(
            `${API_CONFIG.baseUrl}/usuario/foto`,
            { responseType: 'blob' });
    }

    buscarPolicial(policial_id: String): Observable<PolicialDTO> {
        return this.http.get<PolicialDTO>(
            `${API_CONFIG.baseUrl}/policial/${policial_id}`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PolicialDTO } from 'src/models/policial.dto';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class PolicialService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    usuarioLogado(): Observable<PolicialDTO> {
        return this.http.get<PolicialDTO>(
            `${API_CONFIG.baseUrl}/usuario`);
    }

    buscarFoto(): Observable<any> {
        return this.http.get(
            `${API_CONFIG.baseUrl}/usuario/foto`,
            {responseType: 'blob'});
    }

    buscarPolicial(policial_id: String): Observable<PolicialDTO> {
        return this.http.get<PolicialDTO>(
            `${API_CONFIG.baseUrl}/policial/${policial_id}`);
    }
}

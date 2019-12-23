import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EfetivoUnidadeDTO } from 'src/app/models/efetivo.dto';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
    providedIn: 'root'
})
export class EfetivoUnidadeService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    buscarEfetivo(unidadeId: String): Observable<EfetivoUnidadeDTO> {
        return this.http.get<EfetivoUnidadeDTO>(
            `${API_CONFIG.baseUrl}/upms/${unidadeId}/efetivo`);
    }
}

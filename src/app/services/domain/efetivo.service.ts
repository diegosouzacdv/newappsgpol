import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { EfetivoUnidadeDTO } from 'src/models/efetivo.dto';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EfetivoUnidadeService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    buscarEfetivo(unidadeId: String): Observable<EfetivoUnidadeDTO> {
        return this.http.get<EfetivoUnidadeDTO>(
            `${API_CONFIG.baseUrl}/upms/${unidadeId}/efetivo`);
    }
}

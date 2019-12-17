import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable()
export class ViaturaService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    pesquisarViatura(quant: number, page: number = 0, busca: String): Observable<ViaturaDTO[]> {
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viaturas?placa=${busca}&size=${quant}&page=${page}`);
    }

    buscarViatura(id: String): Observable<ViaturaDTO[]> {
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viaturas?placa=${id}`);
    }

   listarViaturasUnidade(unidade_id: string): Observable<ViaturaDTO[]> {
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viaturas?lotacaoCodigo=${unidade_id}`);
   }
    
}

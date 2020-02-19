import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
    providedIn: 'root',
})
export class ViaturaService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    pesquisarViatura(quant: number, page: number = 0, busca: String): Observable<ViaturaDTO[]> {
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viaturas?placa=${busca}&size=${quant}&page=${page}`);
    }

    buscarViaturaId(id: string): Observable<ViaturaDTO> {
        console.log(id);
        return this.http.get<ViaturaDTO>(
            `${API_CONFIG.baseUrl}/viaturas/${id}`);
    }

   listarViaturasUnidade(unidade_id: string): Observable<ViaturaDTO[]> {
       console.log(unidade_id)
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viaturas?lotacaoCodigo=${unidade_id}`);
   }

   getViaturaVistoria() {
    return this.http.get<ViaturaDTO[]>(
        `${API_CONFIG.baseUrl}/viatura/vistoria/temvistoria`);
   }

   policialVisualizarVistoria() {
    return this.http.get<ViaturaDTO>(
        `${API_CONFIG.baseUrl}/viatura/vistoria/visualizar`);
   }
    
}

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

    pesquisarViatura(quant: number, page: number = 0, busca: string): Observable<ViaturaDTO[]> {
        let placa = '';
        let prefixo = '';
        if (this.tem_numeros(busca)) {
            placa = busca;
        } else if (!this.tem_numeros(busca)) {
            prefixo = busca;
        } else {
            placa = '';
            prefixo = '';
        }
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viaturas?placa=${placa}&prefixo=${prefixo}&size=${quant}&page=${page}`);
    }

    public tem_numeros(texto){
        let regexAlfabeto = /[abcdefghijklmnopqrstuvxwz]/i;
        return regexAlfabeto.test(texto);
     }

    public buscarViaturaId(id: string): Observable<ViaturaDTO> {
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

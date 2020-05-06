import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { API_CONFIG } from 'src/app/config/api.config';
import { EntradaSaida } from 'src/app/models/entrada-saida';
import { map, retry } from 'rxjs/operators';
import { EntradaSaidaDTO } from 'src/app/models/entrada-saida-DTO';

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

    public tem_numeros(texto) {
        let regexAlfabeto = /[abcdefghijklmnopqrstuvxwz]/i;
        return regexAlfabeto.test(texto);
    }

    public buscarViaturaId(id: string): Observable<ViaturaDTO> {
        console.log(id);
        return this.http.get<ViaturaDTO>(
            `${API_CONFIG.baseUrl}/viaturas/${id}`);
    }

    listarViaturasUnidade(unidade_id: string, page: number,): Observable<ViaturaDTO[]> {
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viaturas?lotacaoCodigo=${unidade_id}&size=20&page=${page}`);
    }

    getViaturaEmUso() {
        return this.http.get<ViaturaDTO[]>(
            `${API_CONFIG.baseUrl}/viatura/vistoria/temvistoria`);
    }

    policialVisualizarVistoria() {
        return this.http.get<ViaturaDTO>(
            `${API_CONFIG.baseUrl}/viatura/vistoria/visualizar`);
    }

    entradaViatura(idViatura: number) {
        const body = {}
        return this.http.put<any>(
            `${API_CONFIG.baseUrl}/controle/viaturaEntrada/${idViatura}`, body);
    }

    saidaViatura(idViatura: number) {
        const body = {}
        return this.http.put<any>(
            `${API_CONFIG.baseUrl}/controle/viaturaSaida/${idViatura}`, body);
    }

    getPatio(page: number): Observable<EntradaSaida[]> {
        console.log(page)
        return this.http.get<EntradaSaida[]> (
            `${API_CONFIG.baseUrl}/controle/patio/page?size=10&page=${page}`)
            .pipe(map((response: EntradaSaida[]) => response), retry(2));
    }

    getViaturasPatioUpmLocal(page: number) {
        console.log(page)
        return this.http.get<EntradaSaidaDTO[]>(
            `${API_CONFIG.baseUrl}/controle/upmlocal?size=10&page=${page}`)
            .pipe(map((response: EntradaSaidaDTO[]) => response), retry(2));
    }

}

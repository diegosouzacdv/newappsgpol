import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { VistoriaVistoriaDTO } from 'src/app/models/vistoria-viatura.dto';
import { ItensVistoria } from 'src/app/models/itens-vistoria';

@Injectable({
    providedIn: 'root',
})
export class ItensVistoriaService {

    private id

    constructor(public http: HttpClient) {

    }

    findAll(): Observable<ItensVistoria[]> {
        return this.http.get<ItensVistoria[]>(`${API_CONFIG.baseUrl}/viatura/vistoria/itensvistoria`);
    }

    buscarVistoria(idViatura: number): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/viatura/vistoria/${idViatura}`);
    }


    inserirVistoria(idViatura: number): Observable<VistoriaVistoriaDTO> {
        const body = {}
        return this.http.post<VistoriaVistoriaDTO>(
            `${API_CONFIG.baseUrl}/viatura/vistoria/${idViatura}`, body);
    }

    updateVistoria(body: VistoriaVistoriaDTO): Observable<VistoriaVistoriaDTO> {
        body.dataLiberacao  = null;
        body.dataVistoria  =  null;
        return this.http.put<VistoriaVistoriaDTO>(
            `${API_CONFIG.baseUrl}/viatura/vistoria`, body);
    }

    invalidarVistoria(body: VistoriaVistoriaDTO): Observable<VistoriaVistoriaDTO> {
        return this.http.put<VistoriaVistoriaDTO>(
            `${API_CONFIG.baseUrl}/viatura/vistoria/invalidar/${body.id}`, body);
    }

    salvarVisaoAdjunto(body: VistoriaVistoriaDTO): Observable<VistoriaVistoriaDTO> {
        console.log(body)
        body.dataVistoria = null;
        body.dataLiberacao = null;
        body.vistoriaViaturaItensVistoria = null;
        return this.http.put<VistoriaVistoriaDTO>(
            `${API_CONFIG.baseUrl}/viatura/vistoria/salvaradjunto/${body.id}`, body);
    }

    inserirItem(idItem: number) {
        const body = {}
        return this.http.put<VistoriaVistoriaDTO>(
            `${API_CONFIG.baseUrl}/viatura/vistoria/item/${idItem}`, body);
    }


}
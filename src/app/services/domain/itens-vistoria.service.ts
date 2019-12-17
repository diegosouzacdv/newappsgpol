import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItensVistoriaDTO } from 'src/app/models/itens-vistoria.dto';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { VistoriaVistoriaDTO } from 'src/app/models/vistoria-viatura.dto';

@Injectable()
export class ItensVistoriaService {

    private id

    constructor(public http: HttpClient) {

    }

    findAll() : Observable<ItensVistoriaDTO[]> {
        return this.http.get<ItensVistoriaDTO[]>(`${API_CONFIG.baseUrl}/itensvistoria`);
    }

    buscarVistoria(idViatura: number): Observable<any> {

        return this.http.get<any>(`${API_CONFIG.baseUrl}/viatura/vistoria/${idViatura}`);
    }


    inserirVistoria(idPolicial: number, idViatura: number): Observable<VistoriaVistoriaDTO> {
        const body = {
            viatura: idViatura,
            pessoaMotorista: idPolicial
        }
        return this.http.post<VistoriaVistoriaDTO>(
            `${API_CONFIG.baseUrl}/viatura/vistoria`, body);
    }

    inserirItem(idViatura: number, idItem: number, YN: boolean) {
        console.log(idViatura, idItem, YN)
    }


}
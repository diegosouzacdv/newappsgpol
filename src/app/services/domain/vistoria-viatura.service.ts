import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { ItensVistoriaDTO } from 'src/models/itens-vistoria.dto';
import { Observable } from 'rxjs';

@Injectable()
export class VistoriaViatura {

    constructor(public http: HttpClient) {

    }

    
}
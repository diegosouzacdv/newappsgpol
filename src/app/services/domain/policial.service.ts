import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { API_CONFIG } from 'src/app/config/api.config';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root',
  })
export class PolicialService {

    constructor(public http: HttpClient, 
        public storage: StorageService,
        private geolocation: Geolocation) {
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

    getLocalization():any {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log(resp.coords)
          return resp.coords;
         }).catch((error) => {
            console.log('Error getting location ' + error);
         });
      }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { CredenciaisDTO } from '../models/credencias.dto';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalUser } from '../models/local_user';

const httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YXBwc2dwb2w6QHBwc2dwQGw='
    })
  };

@Injectable()
export class AuthService {

    private helper = new JwtHelperService();

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        ){

        }

    authenticate(creds: CredenciaisDTO) {

        const body = `login=appsgpol&username=${creds.username}&password=${creds.password}&grant_type=password`;

        return this.http.post(
            `${API_CONFIG.baseUrl}/oauth/token`,
            body,
            httpOptions)
    }

    successfullLogin(authorizationValue: string) {
        this.logout();
        let user : LocalUser = { 
            token : authorizationValue,
            id : this.helper.decodeToken(authorizationValue)['user_name']
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}
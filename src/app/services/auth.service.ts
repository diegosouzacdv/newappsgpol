import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { CredenciaisDTO } from '../models/credencias.dto';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalUser } from '../models/local_user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YXBwc2dwb2w6QHBwc2dwQGw='
    })
  };

  private helper = new JwtHelperService();

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public navCtrl: NavController
  ) {

  }

  authenticate(creds: CredenciaisDTO) {
    console.log(`${API_CONFIG.baseUrl}/oauth/token`)
    const body = `login=appsgpol&username=${creds.username}&password=${btoa(creds.password)}&grant_type=password`;

    return this.http.post(
      `${API_CONFIG.baseUrl}/oauth/token`,
      body,
      this.httpOptions)
  }

  refreshToken() {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic YXBwc2dwb2w6QHBwc2dwQGw=',
      }),
      withCredentials: true
    };
    const body = `grant_type=refresh_token`;
    console.log('REFRESH TOKEN DO SERVICE')
    return this.http.post(
      `${API_CONFIG.baseUrl}/oauth/token`,
      body,
      headers)
  }

  successfullLogin(authorizationValue: string) {
    this.logout();
    let token =this.helper.decodeToken(authorizationValue)
    console.log(token)
    let user: LocalUser = {
      token: authorizationValue,
      id: token['user_name'],
      authorities: token['authorities']
    };
    console.log(user)
    this.storage.setLocalUser(user);
  }

  isTokenValid(token) {
    if (!this.helper.isTokenExpired(token)) {
      return false;
    } else {
        return true;
      }

  }

  logout() {
    this.storage.setLocalUser(null);
    this.navCtrl.navigateRoot('/login');
  }
}
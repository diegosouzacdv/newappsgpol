import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local_user';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { LoginSave } from '../models/login-save';

@Injectable({
    providedIn: 'root',
  })
export class StorageService {

    getLocalUser() : LocalUser {

        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if (user == null ) {
            return null;
        }
        else {
            return JSON.parse(user);
        }
    }

    setLocalUser(objeto : LocalUser) {

        if (objeto == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(objeto));
        }
    }


    getSenhaSalva() {
        let senha = localStorage.getItem(STORAGE_KEYS.senhaSalva);
        if (senha == null) {
            return null;
        } else {
            senha = window.atob(senha);
            return JSON.parse(senha);
        }
    }

    setSenhaSalva(login: LoginSave ) {
        if (!login) {
            localStorage.removeItem(STORAGE_KEYS.senhaSalva);
        } else {
            localStorage.setItem(STORAGE_KEYS.senhaSalva, window.btoa(JSON.stringify(login)));
        }
    }
}
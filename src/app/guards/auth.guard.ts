import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    public storage: StorageService
  ){}

  canActivate(): Promise<boolean> {

    let user = this.storage.getLocalUser()
    return new Promise(resolve => {
      if(!user) this.router.navigate(['/']);
      resolve(user ? true : false);
    })
  }
  

  
}

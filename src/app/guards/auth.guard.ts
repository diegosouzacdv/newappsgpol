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

    return new Promise(resolve => {
      const user = this.storage.getLocalUser()
      if(!user) {
        this.storage.setLocalUser(null);
        this.router.navigate(['/login']);
      }
      resolve(user ? true : false);
    })
  }
  

  
}

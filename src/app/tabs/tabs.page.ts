import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  
  private subscribeLogin: Subscription;

  constructor(
    public authService: AuthService,) {}


  ionViewWillLeave() {
    this.subscribeLogin.unsubscribe();
  }



}

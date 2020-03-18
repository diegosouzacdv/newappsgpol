import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.page.html',
  styleUrls: ['./entrada-saida.page.scss'],
})
export class EntradaSaidaPage implements OnInit {

  constructor(
    public authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}

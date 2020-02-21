import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Pages } from '../models/pages';
import { PagesService } from '../services/page.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public pages: Pages;


  constructor(public pagesServices: PagesService,
    public authService: AuthService) { }

  ngOnInit() {
    this.pagesServices.getListingDataSource()
      .subscribe(response => {
        this.pages = response;
        console.log(this.pages)
      })

  }

  public changePage(pagina: string) {
    this.pages.page.forEach((element) => {
      if(element.nome === pagina) {
        element.ativo = true;
      } else {
        element.ativo = false;
      }
    });
  }

  
  logout() {
    this.authService.logout();
  }


}


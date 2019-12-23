import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-viatura-ficha',
  templateUrl: './viatura-ficha.page.html',
  styleUrls: ['./viatura-ficha.page.scss'],
})
export class ViaturaFichaPage implements OnInit {

  viatura: ViaturaDTO;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        console.log(this.router.getCurrentNavigation().extras.state)
        if (this.router.getCurrentNavigation().extras.state !== undefined && this.router.getCurrentNavigation().extras.state) {
          this.viatura = this.router.getCurrentNavigation().extras.state.viatura;
        } else {
          this.router.navigate(['/tabs/tab2'])
        }
      });
     }

     vistoriar(viatura: ViaturaDTO) {
      console.log("vistoriar");
      let navExtras: NavigationExtras = {
        state: {
          viatura: viatura
        }
      };
      this.router.navigate(['/tabs/vistoria'], navExtras)
      
    }

  ngOnInit() {
  }

}

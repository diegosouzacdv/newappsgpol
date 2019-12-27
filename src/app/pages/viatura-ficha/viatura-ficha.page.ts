import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';

@Component({
  selector: 'app-viatura-ficha',
  templateUrl: './viatura-ficha.page.html',
  styleUrls: ['./viatura-ficha.page.scss'],
})
export class ViaturaFichaPage implements OnInit {

  viatura: ViaturaDTO;
  temVistoria: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itensVistoriaService: ItensVistoriaService) {

      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state !== undefined && this.router.getCurrentNavigation().extras.state) {
          this.viatura = this.router.getCurrentNavigation().extras.state.viatura;
          this.isVistoria(this.viatura)
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
      this.router.navigate(['/vistoria', viatura.id, this.temVistoria], navExtras)
      
    }

   public isVistoria(viatura) {
    this.itensVistoriaService.buscarVistoria(viatura.id)
      .subscribe(response => {
        if (response != null) {
          this.temVistoria = true;
        } 
      })
    }

  ngOnInit() {
  }

}

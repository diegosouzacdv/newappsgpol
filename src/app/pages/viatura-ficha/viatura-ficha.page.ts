import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';

@Component({
  selector: 'app-viatura-ficha',
  templateUrl: './viatura-ficha.page.html',
  styleUrls: ['./viatura-ficha.page.scss'],
})
export class ViaturaFichaPage implements OnInit {

  viatura: ViaturaDTO;
  temVistoria: boolean = false;
  adjunto = 'false'
  situacaoViatura;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itensVistoriaService: ItensVistoriaService) {
      this.situacaoViatura = SituacaoViatura;
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state !== undefined && this.router.getCurrentNavigation().extras.state) {
          this.viatura = this.router.getCurrentNavigation().extras.state.viatura;
          this.isVistoria(this.viatura)
        } else {
          if(this.adjunto !== 'true') {
            this.router.navigate(['/tabs/tab2'])
          } else {
            this.router.navigate(['/adjunto'])
          }
        }
      });

      this.adjunto = this.route.snapshot.paramMap.get('adjunto');

     }

     vistoriar(viatura: ViaturaDTO) {
      console.log("vistoriar");
      let navExtras: NavigationExtras = {
        state: {
          viatura: viatura
        }
      };
      this.router.navigate(['/vistoria', viatura.id, this.temVistoria, this.adjunto], navExtras)
      
    }

   public isVistoria(viatura) {
    this.itensVistoriaService.buscarVistoria(viatura.id)
      .subscribe(response => {
        console.log(response)
        if (response != null && response.id !== 0) {
          this.temVistoria = true;
        } 
        console.log(this.temVistoria)
      })
    }

  ngOnInit() {
  }

}

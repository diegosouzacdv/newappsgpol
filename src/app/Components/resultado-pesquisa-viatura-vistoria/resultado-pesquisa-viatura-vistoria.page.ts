import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViaturaService } from 'src/app/services/domain/viatura.service';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { SituacaoViatura } from 'src/app/models/situacao-viatura.enum';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { Subscription } from 'rxjs';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';

@Component({
  selector: 'app-resultado-pesquisa-viatura-vistoria',
  templateUrl: './resultado-pesquisa-viatura-vistoria.page.html',
  styleUrls: ['./resultado-pesquisa-viatura-vistoria.page.scss'],
})
export class ResultadoPesquisaViaturaVistoriaPage implements OnInit {

  
  @Input() busca: string;
  @Input() viaturas: ViaturaDTO[] = [];
  situacaoViatura;
  @Input() policial: PolicialDTO;
  @Input() adjunto = false;
  private subscribeTemVistoria: Subscription;

  constructor(
    public router: Router,
    public viaturaService: ViaturaService,
    private itensVistoriaService: ItensVistoriaService,) {
      this.situacaoViatura = SituacaoViatura; }

  ngOnInit() {
    if (this.viaturas !== undefined) {
      this.viaturas.forEach(viatura => {
        this.subscribeTemVistoria = this.itensVistoriaService.isViaturaVistoria(viatura.id)
           .subscribe(response => {
             viatura.viaturaTemVistoria = response;
             if (viatura.viaturaTemVistoria.idVistoria !== null) {
             }
           })
       })
       console.log(this.viaturas)
    }
  }

  fichaViatura(idViatura: number) {
    this.router.navigate(['/viatura-ficha', idViatura])
  }

  vistoriar(idViatuira: number) {
    this.router.navigate(['/vistoria', idViatuira, 'false'])
  }

  ionViewWillLeave() {
    if (!this.subscribeTemVistoria.closed) { this.subscribeTemVistoria.unsubscribe(); }
  }

}

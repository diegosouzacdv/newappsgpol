import { Component, OnInit } from '@angular/core';
import { ViaturaDTO } from 'src/app/models/viatura.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { Subscription } from 'rxjs';
import { VistoriaVistoriaDTO } from 'src/app/models/vistoria-viatura.dto';
import { ItensVistoria } from 'src/app/models/itens-vistoria';

@Component({
  selector: 'app-viatura-vistoria',
  templateUrl: './viatura-vistoria.page.html',
  styleUrls: ['./viatura-vistoria.page.scss'],
})
export class ViaturaVistoriaPage implements OnInit {

  viatura: ViaturaDTO;
  vistoria: VistoriaVistoriaDTO = {
    vistoriaViaturaItensVistoria: []
  }
  idViatura: string;
  temVistoria: boolean;
  teste ='oleo'
  
  private subscribeVistoria: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itensVistoriaService: ItensVistoriaService) { 
      this.receberViatura();
      this.idViatura = this.activatedRoute.snapshot.paramMap.get('id');
      this.getVistoria();
      if(this.activatedRoute.snapshot.paramMap.get('temVistoria') === 'true') {
        this.temVistoria = true; 
      } else {
        this.temVistoria = false; 
      }
      if(!this.temVistoria) {
        this.inserirInicioVistoria(this.idViatura);
      }
    }

  ngOnInit() {
    
  }

  enviarVistoria(){
    console.log(this.vistoria)
    this.vistoria.dataVistoria = null;
    this.vistoria.vistoriaViaturaItensVistoria = null;
    this.itensVistoriaService.updateVistoria(this.vistoria)
      .subscribe(response => {
        console.log(response)
      })
  }

  public getVistoria() {
    console.log('entrando')
    this.itensVistoriaService.buscarVistoria(parseInt(this.idViatura))
      .subscribe(response => {
        console.log(response)
        this.vistoria = response;
      })
  }

  public receberViatura() {
    console.log("viatura recebida: ");
      this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.viatura = this.router.getCurrentNavigation().extras.state.viatura;
        console.log(this.viatura)
      } else {
        this.router.navigate(['/tabs/tab2'])
      }
    })
  }

  recebeItem(item: ItensVistoria ) {
    this.itensVistoriaService.inserirItem(item.id)
      .subscribe(response => {
        console.log(response);
      });
  }

  inserirInicioVistoria(idViatura) {
    console.log('inciou a vistoria')
    this.subscribeVistoria = this.itensVistoriaService.inserirVistoria(parseInt(idViatura))
      .subscribe(response => {
        this.getVistoria();
        console.log(response)
      })
  }

  ionViewWillLeave() {
    if (!this.subscribeVistoria.closed) this.subscribeVistoria.unsubscribe();
  }

}

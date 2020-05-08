import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PolicialService } from 'src/app/services/domain/policial.service';
import { Subscription } from 'rxjs';
import { PolicialDTO } from 'src/app/models/policial.dto';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dados-basico-policial',
  templateUrl: './dados-basico-policial.component.html',
  styleUrls: ['./dados-basico-policial.component.scss'],
})
export class DadosBasicoPolicialComponent implements OnInit {

  private subscribeUser: Subscription;
  @Output() public policial: PolicialDTO;
  @Output() public policialEmitter = new EventEmitter();
  public fotouser: any;

  constructor(
    public policialService: PolicialService,
    public sanitizer: DomSanitizer) {
      
     }

  ngOnInit() {
    this.resolverUser();
    this.getImageIfExists();
  }

  public resolverUser() {
    this.subscribeUser = this.policialService.usuarioLogado()
    .subscribe((response) => {
      this.policial = response;
      this.policialEmitter.emit(this.policial);
    });
  }

  public getImageIfExists() {
    this.policialService.buscarFoto()
      .subscribe(response => {
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.fotouser = this.sanitizer.bypassSecurityTrustUrl(str);
        })
      },
      error => {
      });
    }

    public blobToDataURL(blob) {
      return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
      })
    }

  ionViewWillLeave() {
    if (!this.subscribeUser.closed) this.subscribeUser.unsubscribe();
  }

}

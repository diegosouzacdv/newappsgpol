import { Component, OnInit, Input } from '@angular/core';
import { ItensVistoria } from 'src/app/models/itens-vistoria';
import { Subscription } from 'rxjs';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { PhotoViewer, PhotoViewerOptions } from '@ionic-native/photo-viewer/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-slider-fotos-item',
  templateUrl: './slider-fotos-item.page.html',
  styleUrls: ['./slider-fotos-item.page.scss'],
})
export class SliderFotosItemPage implements OnInit {

  @Input() itemVistoria: ItensVistoria;
  private subscribeGetFoto: Subscription;
  public fotoCapa = './assets/imgs/nopicture.svg';
  public slideFoto: any[] = [];
  public picture = '';
  loading: any;
  private subscribeSalvarFoto: Subscription;
  slidesOptions: any = {
    zoom: {
      toggle: true // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  constructor(private itensVistoriaService: ItensVistoriaService,
              private camera: Camera,
              private loadingController: LoadingController,
              private photoViewer: PhotoViewer,
              public toastController: ToastController,
              public sanitizer: DomSanitizer) { 
    this.fotoCapa = './assets/imgs/nopicture.svg';
  }

  ngOnInit() {
    console.log(this.itemVistoria)
      this.getFotosItens(this.itemVistoria.fotos);
  }

  abrirFotoPerfil(imageUrl) {
    console.log(imageUrl)
    this.photoViewer.show(imageUrl, `Foto do item: ${this.itemVistoria.nome}`, {share: true});
  }

   getFotosItens(url) {
    url.forEach(async element => {
    this.subscribeGetFoto =  this.itensVistoriaService.getFotos(element)
        .subscribe(response => {
            console.log(response)
            this.blobToDataURL(response).then(dataUrl => {
              let str: string = dataUrl as string;
              this.slideFoto.push(this.sanitizer.bypassSecurityTrustUrl(str))
              console.log(this.slideFoto[0].changingThisBreaksApplicationSecurity)
            })
        }, error => {
        });
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

  public getCameraPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: 1
    };

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.sendPicture();
    }, (err) => {
    });
  }

  public async sendPicture() {
    await this.presentLoading();
    try {
   this.subscribeSalvarFoto = this.itensVistoriaService.enviarFoto(this.picture, this.itemVistoria.id)
      .subscribe(response => {
        this.slideFoto.unshift(this.sanitizer.bypassSecurityTrustUrl(this.picture));
        this.slideFoto = [...this.slideFoto, this.sanitizer.bypassSecurityTrustUrl(this.picture)]
        console.log(this.slideFoto)
        this.picture = null;
        this.loading.dismiss();

      }, error => {            
        this.loading.dismiss();
      });
    } finally{}
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }


}

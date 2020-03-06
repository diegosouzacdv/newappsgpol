import { Component, OnInit, Input } from '@angular/core';
import { ItensVistoria } from 'src/app/models/itens-vistoria';
import { Subscription } from 'rxjs';
import { ItensVistoriaService } from 'src/app/services/domain/itens-vistoria.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { PhotoViewer, PhotoViewerOptions } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-slider-fotos-item',
  templateUrl: './slider-fotos-item.page.html',
  styleUrls: ['./slider-fotos-item.page.scss'],
})
export class SliderFotosItemPage implements OnInit {

  @Input() itemVistoria: ItensVistoria;
  private subscribeGetFoto: Subscription;
  public fotoCapa = './assets/imgs/nopicture.svg';
  public slideFoto: string[] = [];
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
              private photoViewer: PhotoViewer) { 
    this.fotoCapa = './assets/imgs/nopicture.svg';
  }

  ngOnInit() {
    console.log(this.itemVistoria)
      this.getFotosImovel(this.itemVistoria.fotos);
  }

  abrirFotoPerfil(imageUrl, foto) {
    this.photoViewer.show(imageUrl, `Foto do item: ${foto.nome}`, {share: true});
  }

  getFotosImovel(url) {
    url.forEach(element => {
    this.subscribeGetFoto =  this.itensVistoriaService.getFotos(element)
        .subscribe(response => {
          let url = `${API_CONFIG.baseUrl}${element}`;
          this.slideFoto.push(url);
        });
    });
    console.log(this.slideFoto)
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
        this.slideFoto.unshift(this.picture);
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

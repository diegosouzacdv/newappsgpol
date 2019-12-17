import { Component, OnInit } from '@angular/core';
import { CredenciaisDTO } from 'src/app/models/credencias.dto';
import { Subscription } from 'rxjs';
import { MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginGuard } from 'src/app/guards/login.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  creds : CredenciaisDTO = {
    username: "",
    password: ""
  }
  loginForm: FormGroup;
  loading: any;
  
  private subscribeLogin: Subscription;

  constructor(
    public menu: MenuController,
    public authService: AuthService,
    private formBuild: FormBuilder,
    private loadingController: LoadingController,
    public loginGuard: LoginGuard,) { 
      this.loginForm = this.formBuild.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
    }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  async login() {
    await this.presentLoading();
    try {
    this.subscribeLogin = this.authService.authenticate(this.creds)
      .subscribe(response => {
        console.log(response);
        this.authService.successfullLogin(response['access_token']);
        this.loginGuard.canActivate();
        this.loading.dismiss();
       // this.app.getPolicial();
        //this.app.getImageIfExists();
        //this.app.getLocalization();
        //this.navCtrl.navigateRoot('/tabs');
      }, (errors => {
        this.loading.dismiss();
      }))
    } finally {
    }
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.subscribeLogin.unsubscribe();
  }

}

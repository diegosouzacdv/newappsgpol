import { Component, OnInit } from '@angular/core';
import { CredenciaisDTO } from 'src/app/models/credencias.dto';
import { Subscription } from 'rxjs';
import { MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginGuard } from 'src/app/guards/login.guard';
import { LoginSave } from 'src/app/models/login-save';
import { StorageService } from 'src/app/services/storage.service';

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
  public temDados = false;
  
  private subscribeLogin: Subscription;

  constructor(
    public menu: MenuController,
    public authService: AuthService,
    private formBuild: FormBuilder,
    private loadingController: LoadingController,
    public loginGuard: LoginGuard,
    public storage: StorageService,) { 
      this.loginForm = this.formBuild.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })

      if (this.storage.getSenhaSalva()) {
        this.temDados = true;
        let login: LoginSave = this.storage.getSenhaSalva()
        this.creds.password = login.password;
        this.creds.username = login.username;
      }
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
      }, (errors => {
        this.loading.dismiss();
      }))
    } finally {
    }
  }

  public saveStar(event) {
    let login: LoginSave = {
      password: this.loginForm.value.password,
      username: this.loginForm.value.username
    };
    if (event.detail.checked) {
      if (this.loginForm.value.password) {
        this.storage.setSenhaSalva(login);
      }
    } else {
      this.storage.setSenhaSalva(null);
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

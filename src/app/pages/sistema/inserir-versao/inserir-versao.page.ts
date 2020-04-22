import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Versao } from 'src/app/models/versao/versao';
import { VersaoAppService } from 'src/app/services/domain/versao-app.service';

@Component({
  selector: 'app-inserir-versao',
  templateUrl: './inserir-versao.page.html',
  styleUrls: ['./inserir-versao.page.scss'],
})
export class InserirVersaoPage implements OnInit {

  loginForm: FormGroup;

  constructor(public modalController: ModalController,
              private formBuild: FormBuilder,
              private versaoAppService: VersaoAppService,
              public toastController: ToastController) {
    this.loginForm = this.formBuild.group({
      versao: ['', [Validators.required]],
      url: ['', [Validators.required]],
      observacao: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

  salvar() {
    let versao = this.loginForm.value
    console.log(versao)
    this.versaoAppService.salvarVersoes(versao)
    .subscribe(response => {
      this.presentToast();
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Salvo',
      duration: 2000
    });
    toast.present();
  }


}

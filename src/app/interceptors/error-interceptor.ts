
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FieldMessage } from '../models/field.message';
import { AuthService } from '../services/auth.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    public message: string;

    constructor(public alertCtrl: AlertController,
        public toastController: ToastController,
        public authService: AuthService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(error => {
                    console.log(error)
                    /* let errorObj = error;
                     if (errorObj.error) {
                         errorObj = errorObj.error;
                     }
                     let e: any;
                     if ( !errorObj.status || errorObj.status != undefined) {
                         if (this.isJson(errorObj)) {
                             e = this.convertError(errorObj);
                         }
                         errorObj = e;
                     }*/
                    switch (error.status) {
                        case 403: this.handle403();
                            break;
                        case 401: this.handle401();
                            break;
                        case 422: this.handle422(error);
                            break;
                        case 500: this.handle500(error);
                            break;
                        case 0: this.handle0();
                            break;
                        default:
                            this.handleDefaultError(error);
                    }
                    return throwError(error);
                })) as any;
    }

    public isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            console.log(e)
            return false;
        }
        return true;
    }

    public convertError(error: any) {
        return JSON.parse(error);
    }

    public async handle0() {
        const toast = await this.toastController.create({
            message: 'Serviço temporariamente indisponível!',
            duration: 3000,
            mode: 'ios',
            translucent: true
        });
        toast.present();
        this.authService.logout();
    }

    public async handle403() {
        const toast = await this.toastController.create({
            message: 'Usuario ou senha errada!',
            duration: 3000,
            mode: 'ios',
            translucent: true
        });
        toast.present();
        //this.authService.logout();
    }

    public async handle401() {
        const toast = await this.toastController.create({
            message: 'Usuario ou senha errada!',
            duration: 3000,
            mode: 'ios',
            translucent: true
        });
        toast.present();
    }

    public handle422(errorObj) {
        const alert = this.alertCtrl.create({
            header: 'Campo Obrigatório',
            message: this.listErrors(errorObj.errors),
            backdropDismiss: false,
            buttons: [
                { text: 'Ok' }
            ]
            // tslint:disable-next-line: no-shadowed-variable
        }).then(alert => alert.present());
    }

    public handle500(error) {
        console.log(error)
        let msg: string;
        if (error.error.message) {
            msg = error.error.message
        } else {
            msg = error.message
        }
        const alert = this.alertCtrl.create({
            header: 'Error',
            message: msg,
            backdropDismiss: false,
            buttons: [
                { text: 'Ok' }
            ]
            // tslint:disable-next-line: no-shadowed-variable
        }).then(alert => alert.present());
    }

    public handleDefaultError(errorObj) {
        const alert = this.alertCtrl.create({
            header: 'Error ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: [
                { text: 'Ok' }
            ]
            // tslint:disable-next-line: no-shadowed-variable
        }).then(alert => alert.present());
    }

    private listErrors(messages: FieldMessage[]): string {
        let s = '';
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
        }
        return s;
    }

}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};

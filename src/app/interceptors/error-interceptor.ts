import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController
        ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Passou pelo error interceptor');
        return next.handle(req).pipe(
            catchError((error) => {
                let errorObj = error;
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 500:
                        this.handle500();
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                }
                return throwError(errorObj);
        }) as any);
    }

    handle401() {
        this.alertCtrl.create({
            message: 'Falha na autenticação',
            subHeader: 'Usuário ou senhas incorretos!',
            buttons: ['Ok']}).then(alert => alert.present());
        this.storage.setLocalUser(null);
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle500() {
        this.alertCtrl.create({
            message: 'Erro no servidor',
            subHeader: 'Não foi possível executar a operação!',
            buttons: ['Ok']}).then(alert => alert.present());;
    }

    handleDefaultError(errorObj) {
        this.alertCtrl.create({
            message: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            subHeader: errorObj.message,
            buttons: ['Ok']}).then(alert => alert.present());
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};

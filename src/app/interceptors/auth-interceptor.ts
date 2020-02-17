import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,
        private authService: AuthService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.substring(0, 14) == './assets/sampl') {
            return next.handle(req);
        }


        let localUser = this.storage.getLocalUser();

        if (localUser) {
            if (this.authService.isTokenValid(localUser.token)) {
                this.authService.logout();
            } else {
                /*const authReq = req.clone({ headers: req.headers.set(withCredentials:true,});
            return next.handle(authReq)
                .pipe(
                    catchError(error => {
                        console.log(error)
                        return throwError(error);
                    })) as any;*/

            }
        }


        if (localUser) {
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
            return next.handle(authReq)
                .pipe(
                    catchError(error => {
                        console.log(error)
                        return throwError(error);
                    })) as any;
        }

        return next.handle(req)
            .pipe(
                catchError(error => {
                    console.log(error)
                    return throwError(error);
                })) as any;
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
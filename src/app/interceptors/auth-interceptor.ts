import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

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
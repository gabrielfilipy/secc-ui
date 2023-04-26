import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, from } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SeccHttp implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if ((!req.url.includes('/login') && this.auth.isTokenInvalid())  
        || (!req.url.includes('/mesa') && this.auth.isTokenInvalid())) {

        console.log('Token do cookie: ' + this.auth.pegaTokenDoSigaNoCookie());

        alert('Token inválido. Você será redirecionando para o siga!');

        //this.router.navigate(['/login'])
        window.location.replace(`${environment.apiSigaUrl}/sigaex/app/mesa2`)
    } 

    return next.handle(req);
  }

}
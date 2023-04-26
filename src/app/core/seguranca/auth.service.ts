import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenSiga!: string;
  tokenUser!: string;
  public jwtPayload: any;

  constructor( 
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) 
  { 
    this.carregaToken();
    this.tokenSiga = `${environment.apiUrl}/oauth/jwt/siga`;
    this.tokenUser = `${environment.apiUrl}/autenticar`;
  }

  login(login: Login) : Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(login.sigla + ':' + login.senha));

    return this.http.post<any>(`${this.tokenUser}`, '', { headers, withCredentials: true }) 
        .toPromise()
        .then(response => {
          this.armazenarToken(response['token']);
          
        }); 
  }

  autenticar(login: Login) : Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(login.sigla + ':' + login.senha));

    return this.http.post<any>(`${this.tokenUser}`, '', { headers, withCredentials: true }) 
        .toPromise()
        .then(response => {
          const token = response['token'];

          return token;
        }); 
  }

  private armazenarToken(token: any) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);

    localStorage.setItem('token-jwt-siga', token);
  }

  carregaToken() {
    const token = this.pegaTokenDoSigaNoCookie();
   
    if (token) {
      this.armazenarToken(token);
    }

    return token

  }

  eliminarToken() {
    localStorage.removeItem('token-jwt-siga');
    this.jwtPayload = null;
  }

  isTokenInvalid() {
    const token = this.pegaTokenDoSigaNoCookie();
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  pegaTokenDoSigaNoCookie() {
    const nomeCookie = environment.tokenAmbienteSiga;
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookie = `${nomeCookie}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookie) == 0) {
        var value = c.substring(cookie.length, c.length)
        return value.replace('Bearer ', '');
      }
    }

    return ''
  }

}
 
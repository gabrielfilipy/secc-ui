import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Documento, Login } from '../core/mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssinarService {

  autenticarURL!: string;
  documentoURL!: string;
  assinarComCertificadoURL!: string;

  constructor(private http: HttpClient) { 
    this.autenticarURL = `${environment.apiUrl}/autenticar`;
    this.documentoURL = `${environment.apiUrl}/documento`;
    this.assinarComCertificadoURL = `${environment.apiUrl}/assinador`;
  }

  login(login: Login) : Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(login.sigla + ':' + login.senha));

    return this.http.post<any>(`${this.autenticarURL}`, '', { headers, withCredentials: true }) 
        .toPromise()
        .then(() => {
          //Até o momento não existe necessidade de salvar esse token do siga
          //this.armazenarToken(response['token']);
        }); 
  }

  assinarDocumentoComSenha(documento: Documento, tokenAssinante: any) : Promise<any> {
    return this.http.post<any>(`${this.documentoURL}/assinar-com-senha?tokenAssinante=${tokenAssinante}`, documento) 
        .toPromise(); 
  }

  prepararDocumentoParaCertificado(documento: Documento) : Promise<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(`${this.documentoURL}/prepara-documento-certificado`, documento) 
        .toPromise(); 
  }

 
}
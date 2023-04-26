import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSigaService {

  pessoaURL!: string;

  constructor(private http: HttpClient) { 
    this.pessoaURL = `${environment.apiUrl}/pessoa/buscar`;
  }

  buscarUsuario(sigla: string) : Promise<any> {
    return this.http.get<any>(`${this.pessoaURL}/${sigla}`,) 
        .toPromise();
  } 

}

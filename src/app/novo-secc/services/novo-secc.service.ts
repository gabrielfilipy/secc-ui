import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Documento, TextoPadrao } from 'src/app/core/mode';
import { environment } from 'src/environments/environment';

const LS_CHAVE: string = "secc";

@Injectable({
  providedIn: 'root'
})
export class NovoSeccService {

  documentoURL!: string;

  constructor(private http: HttpClient) { 
    this.documentoURL = `${environment.apiUrl}`;
  }

  criarNovoDocumento(documento: Documento) : Promise<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(`${this.documentoURL}/documento`, documento) 
        .toPromise(); 
  }

  listarTextoPadrao(modelo: string, pessoa: string): Promise<any> {
    let params = new HttpParams();

    params = params.set('siglaPessoa', pessoa);
    params = params.set('modelo', modelo);

    return this.http.get(
      `${this.documentoURL}/texto-padrao/buscar`, { params } ) 
        .toPromise()
        .then((response: any) => {
          //console.log(response)
          const txtPadrao = response;
  
          const resultado = {
            txtPadrao
          };
  
          return resultado;
        }); 
  }

  salvarTextoPadrao(txtPadrao: TextoPadrao) : Promise<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(`${this.documentoURL}/texto-padrao`, txtPadrao) 
        .toPromise(); 
  }

  buscarTextoPadrao(id: any) : Promise<any> {
    const headers = new HttpHeaders();
    return this.http.get<any>(`${this.documentoURL}/texto-padrao/buscar-por-id?id=${id}`) 
        .toPromise(); 
  }

  pesquisarMaterial(desc: string) : Promise<any> { 
    return this.http.get<any>(`${this.documentoURL}/pesquisarMaterial/${desc}`) 
        .toPromise();
  }

  deletarTextoPadrao(id: number) : Promise<any> {
    return this.http.delete<any>(`${this.documentoURL}/texto-padrao/${id}`) 
        .toPromise(); 
  }
}

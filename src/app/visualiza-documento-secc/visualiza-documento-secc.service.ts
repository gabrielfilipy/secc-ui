import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisualizaDocumentoSeccService {

  documentoURL!: string;
  movimentacaoURL!: string;
  cossignatarioURL!: string;
  materialURL!: string;
  servicoURL!: string;

  constructor(private http: HttpClient, private rota: Router) { 
    this.documentoURL = `${environment.apiUrl}/documento`;
    this.movimentacaoURL = `${environment.apiUrl}/movimentacao`;
    this.cossignatarioURL = `${environment.apiUrl}/pessoa`;
    this.materialURL = `${environment.apiUrl}/material`;
    this.servicoURL = `${environment.apiUrl}/servico`;
  }

  buscarDocumento(sigla: string) : Promise<any> { 
    return this.http.get<any>(`${this.documentoURL}/visualizar/${sigla}`) 
        .toPromise();
  }
  buscarDocumentoPorId(id: any) : Promise<any> { 
    return this.http.get<any>(`${this.documentoURL}/buscar/${id}`) 
        .toPromise();
  }

  incluirCossignatario(siglaDoc: string, matricula: string) : Promise<any> {
    return this.http.post(`${this.movimentacaoURL}/incluir-cossignatario?siglaDocumento=${siglaDoc}&siglaPessoa=${matricula}`, '')
      .toPromise();
  }

  recuperarCossinatario(siglaDocumento: string, tipoMovimentacao: string) : Promise<any> {
    return this.http.get(`${this.movimentacaoURL}/buscar-movimentacao?siglaDocumento=${siglaDocumento}&tipoMovimentacao=${tipoMovimentacao}`)
      .toPromise();
  }

  excluirDocumento(sigla: string) {
    return this.http.post(`${this.documentoURL}/excluir/${sigla}`, '') 
        .toPromise();
  }

  finalizarDocumento(sigla: string) {
    return this.http.post(`${this.documentoURL}/finalizar-documento/${sigla}`, '') 
        .toPromise();
  }
  pesquisarMaterial(desc: String) : Promise<any> { 
    return this.http.get<any>(`${this.materialURL}/material-descricao?desc=${desc}`) 
        .toPromise();
  }
  pesquisarMaterialCodigo(codigo: String) : Promise<any> { 
    return this.http.get<any>(`${this.materialURL}/material-codigo?codigo=${codigo}`) 
        .toPromise();
  }
  pesquisarServico(desc: String) : Promise<any> { 
    return this.http.get<any>(`${this.servicoURL}/servico-descricao?desc=${desc}`) 
        .toPromise();
  }
  pesquisarServicoCodigo(codigo: String) : Promise<any> { 
    return this.http.get<any>(`${this.servicoURL}/servico-codigo?codigo=${codigo}`) 
        .toPromise();
  }

}
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movimentacao } from '../core/mode';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  movimentacaoURL!: string;

  constructor(private http: HttpClient) { 
    this.movimentacaoURL = `${environment.apiUrl}/movimentacao`;
  }

  carregarMovimentacoes(siglaDocumento: string, tipoMovimentacao: any): Promise<any> {
    return this.http.get(
      `${this.movimentacaoURL}/buscar-movimentacoes?siglaDocumento=` + siglaDocumento + '&tipoMovimentacao=' + tipoMovimentacao) 
        .toPromise();   
  }

  incluirCossignatario(movimentacao: Movimentacao) : Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json; charset=utf-8')
    return this.http.post(`${this.movimentacaoURL}/incluir-cossignatario`, movimentacao, { headers })
      .toPromise();
  }

  excluirMovimentacao(siglaDocumento: string, tipoMovimentacao: string, siglaSubscritor: string) {
    return this.http.post(`${this.movimentacaoURL}/excluir-movimentacao?siglaDocumento=${siglaDocumento}&tipoMovimentacao=${tipoMovimentacao}&siglaSubscritor=${siglaSubscritor}`, '') 
        .toPromise();
  }

}

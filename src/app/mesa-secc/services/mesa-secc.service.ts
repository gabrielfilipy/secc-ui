import { Injectable } from '@angular/core';
import { windowWhen } from 'rxjs';
import { Secc } from 'src/app/shared/models/secc.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const LS_CHAVE: string = "secc";

export class MesaFiltro {
  page: number = 0
  size = 5;
  dataAssinatura = false;
  dataExclusao = false;
  siglaCadastrante!: string;
}

@Injectable({
  providedIn: 'root'
})
export class MesaSeccService {

  carregarDocumentos!: string;

  constructor(private http: HttpClient) { 
    this.carregarDocumentos = `${environment.apiUrl}/documento`;
  }

  listarTodos(): Secc[] {
    const secc = localStorage[LS_CHAVE];
    //conteudo
    return secc ? JSON.parse(secc) : [];
  } 
  
  carregarMesa(filtro: MesaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.page)
      .set('size', filtro.size);

    params = params.set('siglaCadastrante', filtro.siglaCadastrante);
    params = params.set('dataAssinatura', filtro.dataAssinatura);
    params = params.set('dataExclusao', filtro.dataExclusao);

    return this.http.get(
      `${this.carregarDocumentos}`, { params } ) 
        .toPromise()
        .then((response: any) => {
          
          const documentos = response['content'];
  
          const resultado = {
            documentos,
            total: response['totalElements']
          };
  
          return resultado;
        }); 
  }

}
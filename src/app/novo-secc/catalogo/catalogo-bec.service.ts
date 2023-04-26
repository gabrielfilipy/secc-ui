import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatalogoBecService {

  materialURL!: string;
  servicoURL!: string;

  constructor(private http: HttpClient, private rota: Router) { 
    this.materialURL = `${environment.apiUrl}/material`;
    this.servicoURL = `${environment.apiUrl}/servico`;
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

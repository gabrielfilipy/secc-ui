import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private messageService: MessageService,
    private rota: Router
  ) { }

  handle(errorResponse: any) {
    let mensagem: string = '';
    mensagem = errorResponse.error.detail;
    if (errorResponse['status'] === 400 || errorResponse['status'] === 404) {  
      mensagem = errorResponse.error.detail;
    } else {
        mensagem = 'Ocorreu um erro interno. Tente novamente mais tarde.';
        console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: mensagem });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensagem-sistema',
  templateUrl: './mensagem-sistema.component.html',
  styleUrls: ['./mensagem-sistema.component.css']
})
export class MensagemSistemaComponent implements OnInit {

  mensagem = ''

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const msg = this.activeRoute.snapshot.params['msg'];
    if(msg) {
      this.mensagem = msg;
    }
    window.setTimeout(() => {
      window.location.href = "http://localhost:8080/siga";
    }, 3600);
  }

  addMensagem(mensagem: string) {
    this.mensagem = mensagem;
  }

}

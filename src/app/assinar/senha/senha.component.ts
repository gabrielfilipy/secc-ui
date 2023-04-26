import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorService } from 'src/app/core/error.service';
import { Documento, Login } from 'src/app/core/mode';
import { AuthService } from 'src/app/core/seguranca/auth.service';
import { DialogComponent } from 'src/app/dialog-secc/dialog/dialog.component';
import { VisualizaDocumentoSeccService } from 'src/app/visualiza-documento-secc/visualiza-documento-secc.service';
import { AssinarService } from '../assinar.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

  blocked: boolean = false;
  documento = new Documento();
  usuario = new Login();
  sigla = '';

  constructor(
    private documentoService: VisualizaDocumentoSeccService, 
    private assinarService: AssinarService,
    private authService: AuthService,
    private errorService: ErrorService,
    private dialogService: DialogService,
    private router: Router,
    public config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.usuario = this.config.data.usuario;
    this.sigla = this.config.data.sigla;
  }

  autenticar() {
    this.authService.autenticar(this.usuario)
      .then((dados) => {
        const token = dados;
        this.assinarComSenha(token);
      }).catch(error => this.errorService.handle(error));
  }

  assinarComSenha(tokenAssinante: any) {
    this.blocked = true; 
    this.documentoService.buscarDocumento(this.sigla)
      .then(dados => {
        this.documento = dados;
        this.assinarService.assinarDocumentoComSenha(this.documento, tokenAssinante)
          .then((dados) => {
            this.blocked = false; 
            this.documento = dados;
            this.openDialogMessage('success', 'Documento ' + this.sigla, 'assinado com sucesso.');
            this.fechar();
            this.router.navigate(['/mesa']);
              
          }).catch(error => [this.openDialogMessage('error', 'Ocorreu um erro ao tentar assinar o documento ' + this.sigla + ': ', error.error.detail), this.blocked = false]);
      });
  }

  openDialogMessage(icon: string, textFeatured: string, text: string) {
    const ref = this.dialogService.open(DialogComponent, {
      width: '25%',
      data: {
        icon: icon,
        textFeatured: textFeatured,
        text: text
      }
    });
  }

  fechar() {
    this.ref.close();
  }

}

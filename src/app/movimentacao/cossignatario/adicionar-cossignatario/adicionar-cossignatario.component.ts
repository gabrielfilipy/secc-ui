import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorService } from 'src/app/core/error.service';
import { Documento, Movimentacao, Pessoa } from 'src/app/core/mode';
import { DialogComponent } from 'src/app/dialog-secc/dialog/dialog.component';
import { UsuarioSigaService } from 'src/app/usuario-siga/usuario-siga.service';
import { VisualizaDocumentoSeccService } from 'src/app/visualiza-documento-secc/visualiza-documento-secc.service';
import { MovimentacaoService } from '../../movimentacao.service';

@Component({
  selector: 'app-adicionar-cossignatario',
  templateUrl: './adicionar-cossignatario.component.html',
  styleUrls: ['./adicionar-cossignatario.component.css']
})
export class AdicionarCossignatarioComponent implements OnInit {

  movimentacao = new Movimentacao();
  documento = new Documento();
  pessoa = new Pessoa();
  disabledButton = true;
  tipoMovimentacao: number = 1;

  constructor(
    private usuarioService: UsuarioSigaService,
    private errorService: ErrorService,
    private movimentacaoService: MovimentacaoService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    private confirmation: ConfirmationService,
    private visualizaDocumentoSeccService: VisualizaDocumentoSeccService
  ) { }

  ngOnInit(): void {
    this.buscarDocumento(this.config.data.sigla)
  }

  openDialogMessage(icon: string, textFeatured: string, text: string) {
    document.hidden
    const ref = this.dialogService.open(DialogComponent, {
      width: '25%',
      data: {
        icon: icon,
        textFeatured: textFeatured,
        text: text
      }
    });
  }

  confirmaAInclusaoCossignatario() {
    this.confirmation.confirm({ 
      message: 'Confirma a inclusão desse cossignatário?',
      accept: () => {
        this.adicionar();
      }
    });
  }

  adicionar() {
    this.movimentacao.cargo = this.pessoa.cargo.nome;
    this.movimentacao.siglaSubscritor = this.pessoa.sigla;
    this.movimentacao.lotacao = this.pessoa.lotacao.sigla;
    this.movimentacao.tipoMovimentacao = this.tipoMovimentacao;
    this.movimentacao.documento = this.documento;
    
    this.movimentacaoService.incluirCossignatario(this.movimentacao)
      .then((dados) => {
        this.fechar()
        this.openDialogMessage('success', 'A pessoa ' + this.pessoa.nome, ' foi incluída como cossignatário desse documento.');
      }).catch(ex => [this.openDialogMessage('alert', ex.error.title + ": " , ex.error.detail)]);
  }

  buscarPessoa(sigla: any) {
    this.usuarioService.buscarUsuario(sigla.value)
      .then(dados => {
        this.disabledButton = false;
        console.log(dados)
        this.pessoa = dados;
      }).catch(error => [this.errorService.handle(error), this.disabledButton = true]);
  }

  buscarDocumento(sigla: string) { 
    this.visualizaDocumentoSeccService.buscarDocumento(sigla)
      .then(dados => {
        this.documento = dados;
      }).catch(error => this.errorService.handle(error)); 
  }

  fechar() {
    this.ref.close();
  }

}

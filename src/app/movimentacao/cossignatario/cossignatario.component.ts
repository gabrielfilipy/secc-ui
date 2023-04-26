import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorService } from 'src/app/core/error.service';
import { Movimentacao } from 'src/app/core/mode';
import { MovimentacaoService } from '../movimentacao.service';

@Component({
  selector: 'app-cossignatario',
  templateUrl: './cossignatario.component.html',
  styleUrls: ['./cossignatario.component.css']
})
export class CossignatarioComponent implements OnInit {

  ref!: DynamicDialogRef;
  @Output() excluirMovimentacao = new EventEmitter();
  @Input() movimentacao : Array<Movimentacao> = [];
  @Input() siglaDocumento !: string;
  carregarMovExcluida = false;
  tipoMovimentacao = 1;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private errorService: ErrorService,
    public config: DynamicDialogConfig,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit(): void {  }

  excluirMovimentacoes(siglaDocumento: string, tipoMovimentacao: any, siglaSubscritor: string) {
    this.movimentacaoService.excluirMovimentacao(siglaDocumento, tipoMovimentacao, siglaSubscritor)
      .then(dados => {
        this.excluirMovimentacao.emit();
      }).catch(error => this.errorService.handle(error));
  }

  confirmaExclusaoDocumento(siglaDocumento: string, tipoMovimentacao: any, siglaSubscritor: string) {
    this.confirmation.confirm({ 
      message: 'Deseja remover esse cossignatário?',
      accept: () => {
        this.excluirMovimentacoes(siglaDocumento, tipoMovimentacao, siglaSubscritor);
      }
    });
  }

}

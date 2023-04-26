import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssinarComponent } from 'src/app/assinar/assinar.component';
import { Documento } from 'src/app/core/mode';
import { DialogComponent } from 'src/app/dialog-secc/dialog/dialog.component';
import { AdicionarCossignatarioComponent } from 'src/app/movimentacao/cossignatario/adicionar-cossignatario/adicionar-cossignatario.component';
import { VisualizaDocumentoSeccService } from '../visualiza-documento-secc.service';

@Component({
  selector: 'app-funcoes',
  templateUrl: './funcoes.component.html',
  styleUrls: ['./funcoes.component.css']
})
export class FuncoesComponent implements OnInit {

  ref!: DynamicDialogRef;

  blocked: boolean = false;
  documento = new Documento();
  @Input() sigla!: string;

  @Output() atualizarListaCossignatarios = new EventEmitter();

  constructor(
    private visualizaDocumentoSeccService: VisualizaDocumentoSeccService,
    public dialogService: DialogService,
    private confirmation: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void { }

  finalizarDocumento() {
    this.blocked = true;
    this.visualizaDocumentoSeccService.finalizarDocumento(this.sigla)
    .then(() => {
      this.openDialogMessage('success', 'Documento ' + this.sigla, 'finalizado com seucesso.');
      this.blocked = false;
      this.router.navigate(['/mesa']);
    }).catch(error => this.openDialogMessage('error', 'Erro ao tentar finalizar o documento ' + this.sigla + ':', error)); 
  }

  confirmaExclusaoDocumento() {
    this.confirmation.confirm({ 
      message: 'Confirma a exclusão do documento?',
      accept: () => {
        this.excluirDocumento();
      }
    });
  }

  excluirDocumento() { 
    this.visualizaDocumentoSeccService.excluirDocumento(this.sigla) 
      .then(() => {
        this.openDialogMessage('success', 'Documento ' + this.sigla, 'foi excluído com seucesso.');
        this.router.navigate(['/mesa']);
      }).catch(error => this.openDialogMessage('error', 'Erro ao tentar excluir o documento ' + this.sigla + ':', error)); 
  }

  isAssinar() {
    this.openDialogAssinar();
  }

  openDialogMessage(icon: string, textFeatured: string, text: string) {
    document.hidden
    const ref = this.dialogService.open(DialogComponent, {
      width: '35%',
      data: {
        icon: icon,
        textFeatured: textFeatured,
        text: text
      }
    });
  }

  openDialogAssinar() {
    const ref = this.dialogService.open(AssinarComponent, {
      width: '27%',
      data: {
        sigla: this.sigla
      }
    });

    ref.onClose.subscribe(() => {
      console.log('Dialog assinar foi fechado.');
    });
  }

  openDialogAdicionaCossignatario() {
    const ref = this.dialogService.open(AdicionarCossignatarioComponent, {
      header: 'Incluir cossignatário',
      width: '25%',
      data: {
        sigla: this.sigla
      }
    });

    ref.onClose.subscribe(() => {
      this.atualizarListaCossignatarios.emit();
      console.log('Dialog incluir cossignatário foi fechado.');
    });

  }

}

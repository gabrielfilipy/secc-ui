import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Documento, Pessoa } from 'src/app/core/mode';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pre-visualizacao',
  templateUrl: './pre-visualizacao.component.html',
  styleUrls: ['./pre-visualizacao.component.css']
})
export class PreVisualizacaoComponent implements OnInit {

  @ViewChild('content', { static:false }) el!:ElementRef;

  pessoaDocumento = new Pessoa();
  documento = new Documento();

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
    ) { }

  ngOnInit(): void {
    this.pessoaDocumento = this.config.data.pessoaDocumento;
    this.documento = this.config.data.documento;
  }

  fechar() {
    this.ref.close();
  }

  getPDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("documento-secc.pdf");
      }
    })
  }

}

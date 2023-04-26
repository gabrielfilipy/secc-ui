import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Documento, Login  } from '../core/mode';
import { AssinarService } from './assinar.service';

import * as $ from 'jquery';  
import { VisualizaDocumentoSeccService } from '../visualiza-documento-secc/visualiza-documento-secc.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent } from '../dialog-secc/dialog/dialog.component';
import { SenhaComponent } from './senha/senha.component';
import { environment } from 'src/environments/environment';
declare function continuarComCertDig(): any;

@Component({
  selector: 'app-assinar',
  templateUrl: './assinar.component.html',
  styleUrls: ['./assinar.component.css']
})
export class AssinarComponent implements OnInit {
  
  sigla = '';
  documento = new Documento();
  usuario = new Login();
  selectedAssinatura: any = null;
  assinaturas: any[] = [{name: 'Senha', key: 'senha'}, {name: 'Certificado digital', key: 'certificado'}];
 
  constructor(
    private assinarService: AssinarService,
    private activeRoute: ActivatedRoute,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private documentoService: VisualizaDocumentoSeccService,
    private readonly ref: DynamicDialogRef
  ) { }
 
  ngOnInit(): void {
    this.sigla = this.config.data.sigla;
    this.selectedAssinatura = this.assinaturas[0];
    const siglaDocumento = this.activeRoute.snapshot.params['sigla'];
    if(siglaDocumento) {
      this.sigla = siglaDocumento;
    }
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

    ref.onClose.subscribe(() => {
      console.log('Dialog menssagem foi fechado.');
    });
  }

  openDialogSenha() {
    this.fechar();
    const ref = this.dialogService.open(SenhaComponent, {
      width: '25%',
      data: {
        usuario: this.usuario,
        sigla: this.sigla
      }
    });

    ref.onClose.subscribe(() => {
      console.log('Dialog assinar com senha foi fechado.');
    });

  }

  assinar() {
    if (this.selectedAssinatura.key === 'certificado') 
      this.assinarComCertificadoDigital();
    else 
      this.openDialogSenha();
      
  }

  assinarComCertificadoDigital() {
    this.fechar();
    this.documentoService.buscarDocumento(this.sigla)
      .then(dados => {
        this.documento = dados;
        this.assinarService.prepararDocumentoParaCertificado(this.documento)
        .then((documento) => {
          console.log('Retorno: ' + documento.sigla)
          localStorage.setItem('sigla-documento', documento.sigla);
          localStorage.setItem('secc-url', `${environment.apiUrl}`);
          localStorage.setItem('siga-url', `${environment.apiSigaUrl}`);
          continuarComCertDig();
        });
      });
  }

  fechar() {
    this.ref.close();
  }

}
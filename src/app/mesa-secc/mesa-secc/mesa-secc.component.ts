import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorService } from 'src/app/core/error.service';
import { Documento, Pessoa, Tipo } from 'src/app/core/mode';
import { MesaFiltro, MesaSeccService } from '../services/mesa-secc.service';

import * as moment from 'moment';
import { AuthService } from 'src/app/core/seguranca/auth.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-mesa-secc',
  templateUrl: './mesa-secc.component.html',
  styleUrls: ['./mesa-secc.component.css']
})

export class MesaSeccComponent implements OnInit {

  tipo = new Tipo();
  pessoa = new Pessoa();
  id:any = '';
  totalRegistros = 0;
  filtro = new MesaFiltro();

  blocked: boolean = false;

  constructor(
    private mesaService: MesaSeccService,
    private errorService: ErrorService,
    public authService: AuthService,
    private titlePage: Title
  ) { }

  documentosCriados : Array<Documento> = [];
  documentosAssinados : Array<Documento> = [];
  carregandoDocumentos = true;

  ngOnInit(): void { 
    /**
     * Inicia abrindo o primeiro accordion de documento criados,
     * e também carrega inicialmente os documentos que não possuem 
     * assunaturas e não tenha uma data de exclusão.
     */
    this.carregarDocumentos(0, false, false);
    this.carregarDocumentos(0, true, false);
    this.id = 'f1';
    this.titlePage.setTitle('Mesa secc');
  }

  accordion(ids:any) {
    if(this.id == ids)  
      this.id = '';
    else 
      this.id = ids;
  }

  aoTrocarPagina(event: LazyLoadEvent, dataAssinatura: boolean, dataExclusao: boolean) {
    const page = event!.first! / event!.rows!;
    this.carregarDocumentos(page, dataAssinatura, dataExclusao);
  }

  carregarDocumentos(page: number, dataAssinatura: boolean, dataExclusao: boolean): void {
    this.filtro = new MesaFiltro();
    this.filtro.page = page;
    this.filtro.siglaCadastrante = this.authService.jwtPayload?.sub;
    this.filtro.dataExclusao = dataExclusao;
    this.filtro.dataAssinatura = dataAssinatura;
    //this.carregandoDocumentos = true;
    
    this.mesaService.carregarMesa(this.filtro)
      .then(dados => {
        this.totalRegistros = dados.total;
        if(dataAssinatura)
          this.documentosAssinados = dados.documentos;
        else
          this.documentosCriados = dados.documentos;
        this.carregandoDocumentos = false;
      }).catch(error => {this.errorService.handle(error), this.carregandoDocumentos = false});
  }

  calculaData(date: any) {
    let data = date,
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear(),
        hora = data.getUTCHours(),
        minuto = data.getUTCMinutes(),
        segundo = data.getUTCSeconds()
    return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo} `; 
  }

  calculaDiferenca(date: any) {
    let d = new Date(date);
    let dtCriacaoDocumento = `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}T${this.pad(d.getHours())}:${this.pad(d.getMinutes())}:${this.pad(d.getSeconds())}`;
    
    //let today = new Date('05 October 2011 14:48 UTC')
    //console.log(today.toISOString())  // Retorna 2011-10-05T14:48:00.000Z

    var criacaoDoDocumento = new Date(dtCriacaoDocumento);        
    var hoje = new Date();

    const diaCriacaoDoc = criacaoDoDocumento.getDay();
    const diaLocal = hoje.getDay();
    const horaCriacaoDoc = criacaoDoDocumento.getHours();
    const horaLocal = hoje.getHours();
    const minutoCriacaoDoc = criacaoDoDocumento.getMinutes();
    const minutoLocal = hoje.getMinutes();
    
    var timeDiff = Math.abs(hoje.getTime() - criacaoDoDocumento.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if(diffDays > 3) {
      return this.calculaData(criacaoDoDocumento);  
    } else {
      if ((horaLocal === horaCriacaoDoc) && (minutoLocal === minutoCriacaoDoc)) {
        return 'Agora mesmo';
      } else {
        if(diaCriacaoDoc > diaLocal) {
          var calcularDiferencaDia = Math.abs(diaCriacaoDoc - diaLocal);
          var resultado = calcularDiferencaDia === 1 ? ' dia' : ' dias';
          return 'Há ' + calcularDiferencaDia + resultado;
        } else if (horaCriacaoDoc > horaLocal) {
          var calcularDiferencaHora = Math.abs(horaCriacaoDoc - horaLocal);
          var resultado = calcularDiferencaHora === 1 ? ' hora' : ' horas';
          return 'Há ' + calcularDiferencaHora + resultado;
        } else {
          var calcularDiferencaSegundos = Math.abs(minutoLocal - minutoCriacaoDoc);
          return 'Há ' + calcularDiferencaSegundos + ' minutos';
        }
      }
       
    }  
    
  } 

  calcularTempo(date: any) {
    const timeElapsed = Date.now();
    var dtCriacaoDocumento = date;
    var dtAgora = new Date(timeElapsed);
    var diff = moment(dtAgora, "DD/MM/YYYY HH:mm:ss").diff(moment(dtCriacaoDocumento, "DD/MM/YYYY HH:mm:ss"));
  }

  pad(date: any) {
    return date.toString().padStart(2, 0);
  }

}
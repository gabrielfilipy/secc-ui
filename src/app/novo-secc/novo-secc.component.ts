import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/core/error.service';
import { Documento, DocumentoSecc, Pessoa, Catalogo, TextoPadrao } from 'src/app/core/mode';
import { VisualizaDocumentoSeccService } from 'src/app/visualiza-documento-secc/visualiza-documento-secc.service';
import { AuthService } from '../core/seguranca/auth.service';
import { UsuarioSigaService } from '../usuario-siga/usuario-siga.service';
import { NovoSeccService } from './services/novo-secc.service';
import { PreVisualizacaoComponent } from './pre-visualizacao/pre-visualizacao.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogComponent } from '../dialog-secc/dialog/dialog.component';

@Component({
  selector: 'app-novo-secc',
  templateUrl: './novo-secc.component.html',
  styleUrls: ['./novo-secc.component.css'],
  providers: [MessageService,ConfirmationService,DialogService]
})  

export class NovoComponent implements OnInit {
 
  respAssinatura = new Pessoa();
  cadastrante = new Pessoa();
  documento = new Documento();
  documentVisualizar = new DocumentoSecc();
  textoPadrao : Array<TextoPadrao> = [];
  txtPadrao = new TextoPadrao();
  userLogado = this.authService.jwtPayload?.sub;
  selectTxtPadrao !: TextoPadrao;
  modeloSetado = '';
  tituloTextoPadrao!: string;
  tituloCadastroTextPadrao = '';

  negociosBEC = ['']
  itensBecAdd: Array<Catalogo> = [];

  sigla = '';
  titulo = '';
  acaoDocumento = 'criado';
  carregar = false;
  display: boolean = false;
  displayDialogTxtPadrao: boolean = false;
  listar: boolean = false; 
  blocked: boolean = false;

  listarUsu() { 
    this.listar = true;
  }

  addTituloTextoPadrao() {
    if(this.selectTxtPadrao) {
      this.tituloCadastroTextPadrao = 'Editar texto padrão';
      this.tituloTextoPadrao = this.selectTxtPadrao.titulo;
    } else
      this.tituloCadastroTextPadrao = 'Cadastrar texto padrão';

    this.displayDialogTxtPadrao = true;
  }

  modeloDocumento = [
    { label : 'Memorando de Aquisição SECC - Material', value : 'Memorando de Aquisição SECC - Material' },
    { label : 'Memorando de Aquisição SECC - Serviço', value : 'Memorando de Aquisição SECC - Serviço' }
  ]

  constructor(
    private novoSeccService: NovoSeccService,
    private visualizar: VisualizaDocumentoSeccService,
    private errorService: ErrorService,
    private usuarioService: UsuarioSigaService,
    private activateRoute: ActivatedRoute,
    public authService : AuthService,
    private router: Router,
    private titlePage: Title,
    public dialogService: DialogService,
    private confirmation: ConfirmationService
    
  ) { }
  ngOnInit(): void {
    //Default de texto padrão será o modelo 'Memorando'.
    this.listarTextoPadrao('Memorando de Aquisição SECC - Material', this.userLogado); 
    this.iniciaUsuarioLogadoComoRespAssinatura();
    const siglaDocumento = this.activateRoute.snapshot.params['sigla']; 
    if (siglaDocumento) {
      this.titulo = 'Editar documento: ' + siglaDocumento;
      this.buscarDocumento(siglaDocumento);
    } else {
      this.titulo = 'Criar documento';
    }
    this.titlePage.setTitle(this.titulo);
  }

  pegaItensBecAdicionado(itens: any) {
    this.itensBecAdd = itens;
    //this.itensBecAdd.forEach((value:any) => {
    //  console.log('item: ' + JSON.stringify(value));
    //});
  }

  pegaPessoa(sigla: any) {
    this.buscar(sigla)
  }

  buscarDocumento(sigla: string) { 
    this.visualizar.buscarDocumento(sigla)
      .then(documento => {
        console.log(documento)
        this.documento = documento;
       
        this.documento.sigla = documento['sigla'];

        this.respAssinatura.sigla = documento['responsavelAssinatura'];
      }).catch(error => this.errorService.handle(error));
  }
  
  iniciaUsuarioLogadoComoRespAssinatura() {
    this.usuarioService.buscarUsuario(this.userLogado)
      .then(dados => {
        this.respAssinatura = dados;
        this.cadastrante = dados;
      }).catch(error => this.errorService.handle(error));
  }
 
  buscar(sigla: any) {
    this.usuarioService.buscarUsuario(sigla.value)
      .then(dados => {
        this.respAssinatura = dados;
      }).catch(error => this.errorService.handle(error));
  }

  criarDoc(form: NgForm) {
    this.blocked = true;
    if(this.documento.sigla) 
      this.acaoDocumento = 'editado'

    this.carregar = true; 
    //Adiciona os Serviços ou Compras da BEC.
    this.negociosBEC = this.itensBecAdd.map(function(item) { return "<b> Codigo: " + item.cdItem + " Descrição: " + item.txDescricaoItem + " </b>"; });
    this.documento.textoMemorando += this.negociosBEC.join(' <br> ');
    this.documento.responsavelAssinatura = this.respAssinatura.sigla;
    this.documento.cadastrante = this.cadastrante.sigla;
    this.novoSeccService.criarNovoDocumento(this.documento)
      .then((documentoCadastrado) => {
        //this.openDialogMessage('success', 'Documento ' + this.documento.sigla, ' cadastrado com sucesso.')
        this.blocked = false;
        
        form.reset; 
        this.documento = new Documento();
        this.router.navigate(['/visualizar', documentoCadastrado.sigla])
        this.carregar = false; 
      }).catch(error => { this.blocked = false, 
        this.carregar = false, this.errorService.handle(error);  
      });
  }

  isAlterModelo(titulo: any) {
    this.listarTextoPadrao(titulo, this.respAssinatura.sigla);
  }

  salvarTextoPadrao(modelo: string, txtP: any) {
    this.txtPadrao = new TextoPadrao();

    if(txtP.value) 
      this.txtPadrao.id = txtP.value.id;

    this.txtPadrao.assunto = this.documento.assunto;
    this.txtPadrao.interessado = this.documento.interessado;
    this.txtPadrao.modelo = modelo;
    this.txtPadrao.textoMemorando = this.documento.textoMemorando;
    this.txtPadrao.titulo = this.tituloTextoPadrao;
    this.txtPadrao.numReferencia = this.documento.numReferencia;
    this.txtPadrao.siglaPessoa = this.userLogado;

    this.novoSeccService.salvarTextoPadrao(this.txtPadrao)
      .then(response => {
        this.textoPadrao = response.txtPadrao;
        this.listarTextoPadrao(modelo, this.userLogado); 

        if(this.txtPadrao.id) 
          this.openDialogMessage('success', 'O texto com o título (' + this.tituloTextoPadrao + ')', ' foi editado com sucesso!');
        else
          this.openDialogMessage('success', 'O texto com o título (' + this.tituloTextoPadrao + ')', ' foi salvo para o módelo ' + modelo);

        this.tituloTextoPadrao = '';
        this.displayDialogTxtPadrao = false;

      }).catch(ex => [this.openDialogMessage('alert', ex.error.title + ": " , ex.error.detail)]);
  }

  deletarTextoPadrao(id: number, titulo: string, modelo: any) {
    this.novoSeccService.deletarTextoPadrao(id)
      .then(response => {
        this.openDialogMessage('success', 'O texto com o título (' + titulo + ')', ' foi excluído com sucesso!');
        this.listarTextoPadrao(modelo, this.userLogado);
      }).catch(ex => [this.openDialogMessage('alert', ex.error.title + ": " , ex.error.detail)]);
  }

  confirmaExclusaoTxtPadrao(id: number, titulo: string, modelo: any) {
    this.confirmation.confirm({ 
      message: 'Deseja deletar esse texto padrão?',
      accept: () => {
        this.deletarTextoPadrao(id, titulo, modelo);
      }
    });
  }

  listarTextoPadrao(modelo: string, pessoa: string) {
    this.novoSeccService.listarTextoPadrao(modelo, pessoa)
      .then(response => {
        console.log(response)
        this.textoPadrao = response.txtPadrao;
      })
  }

  setarValorDesseTexto(id: any) {
    this.novoSeccService.buscarTextoPadrao(id)
      .then(response => {
        this.txtPadrao = response;

        this.documento.interessado = this.txtPadrao.interessado
        this.documento.assunto = this.txtPadrao.assunto
        this.documento.numReferencia = this.txtPadrao.numReferencia
        this.documento.textoMemorando = this.txtPadrao.textoMemorando
      })
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

  openDialogPreVisualizar() {
    const ref = this.dialogService.open(PreVisualizacaoComponent, {
      width: '30%',
      data: {
        documento: this.documento,
        pessoaDocumento: this.respAssinatura
      }
    });

    ref.onClose.subscribe(() => {
      console.log('Dialog menssagem foi fechado.');
    });
  }

}
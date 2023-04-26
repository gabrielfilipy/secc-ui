import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../core/error.service';
import { Documento, Movimentacao, Pessoa } from '../core/mode';
import { AuthService } from '../core/seguranca/auth.service';
import { CossignatarioComponent } from '../movimentacao/cossignatario/cossignatario.component';
import { MovimentacaoService } from '../movimentacao/movimentacao.service';
import { PreVisualizacaoComponent } from '../novo-secc/pre-visualizacao/pre-visualizacao.component';
import { UsuarioSigaService } from '../usuario-siga/usuario-siga.service';
import { VisualizaDocumentoSeccService } from './visualiza-documento-secc.service';

@Component({
  selector: 'app-visualiza-documento-secc',
  templateUrl: './visualiza-documento-secc.component.html',
  styleUrls: ['./visualiza-documento-secc.component.css'],
  providers: [ DialogService ]
})
export class VisualizaDocumentoSeccComponent implements OnInit {

  documento = new Documento();
  pessoa = new Pessoa();
  pessoaDocumento = new Pessoa();
  movimentacao : Array<Movimentacao> = [];
  blocked: boolean = false;

  siglaDocumento = ''
  movCossignatario = 1;
  tipoMovimentacao = 1;

  constructor(
    private visualizaDocumentoSeccService: VisualizaDocumentoSeccService,
    private rota: ActivatedRoute,
    private errorService: ErrorService,
    private usuarioService: UsuarioSigaService,
    public authService: AuthService,
    public dialogService: DialogService,
    private movimentacaoService: MovimentacaoService,
    private titlePage: Title
  ) { }

  ngOnInit(): void {
    this.titlePage.setTitle('Visualizar documento')
    this.blocked = true;
    this.siglaDocumento = this.rota.snapshot.params['sigla'];

    if(this.siglaDocumento.substr(0, 4) != 'SECC') {
      this.authService.eliminarToken();
      window.location.replace(`${environment.apiSigaUrl}/sigaex/app/expediente/doc/exibir?sigla=${this.siglaDocumento.replace('/', '').replace('-', '')}`);
    } else if(this.siglaDocumento) {
      this.blocked = false;
      this.buscarDocumento(this.siglaDocumento);
    }
  }

  openDialogMessage(icon: string, textFeatured: string, text: string) {
    const ref = this.dialogService.open(CossignatarioComponent, {
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

  buscarUsuarioLogado(sigla: string) {
    this.usuarioService.buscarUsuario(sigla)
      .then(dados => {
        this.pessoaDocumento = dados;
      }).catch(error => this.errorService.handle(error));
  }

  buscarDocumento(sigla: string) { 
    this.visualizaDocumentoSeccService.buscarDocumento(sigla)
      .then(dados => {
        this.documento = dados; 
        this.buscarUsuarioLogado(this.documento.cadastrante);
        this.carregarMovimentacoes(this.documento.sigla, this.tipoMovimentacao);
      }).catch(error => this.errorService.handle(error)); 
  }

  buscarPessoa(sigla: any) {
    this.usuarioService.buscarUsuario(sigla.value)
      .then(dados => {
        this.pessoa = dados;
      }).catch(error => this.errorService.handle(error));
  }

  carregarMovimentacoes(siglaDocumento: string, tipoMovimentacao: any) {
    this.movimentacaoService.carregarMovimentacoes(siglaDocumento, tipoMovimentacao)
      .then(dados => {
        this.movimentacao = dados;
        console.log('dados: ' + dados)
      }).catch(error => this.errorService.handle(error));
  }

}
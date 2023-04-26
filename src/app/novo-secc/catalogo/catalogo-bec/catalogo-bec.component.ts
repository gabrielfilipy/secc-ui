import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorService } from 'src/app/core/error.service';
import { Catalogo, Documento, Material, Servico } from 'src/app/core/mode';
import { DialogComponent } from 'src/app/dialog-secc/dialog/dialog.component';
import { CatalogoBecService } from '../catalogo-bec.service';

@Component({
  selector: 'app-catalogo-bec',
  templateUrl: './catalogo-bec.component.html', 
  styleUrls: ['./catalogo-bec.component.css']
})
export class CatalogoBecComponent implements OnInit {

  @Output() listaItensBecAdicionados = new EventEmitter();
  @Input() documento = new Documento(); 
  material = new Material();

  itensAdd: Array<Catalogo> =[];
  itensMaterial: Array<Material> =[];
  itensServico: Array<Servico> =[];

  servico = new Servico();
  catalogo = new Catalogo();

  carregar = false;
  display: boolean = false;

  addItem() {
    this.display = true;
  }

  constructor(
    private catalogoBecService: CatalogoBecService,
    private errorService: ErrorService,
    private dialogService: DialogService
    ) { }

  ngOnInit(): void { } 

  AdicionaItens(desc: String, codigo: number, quantidade: String) {
    this.catalogo = new Catalogo();
    this.catalogo.txDescricaoItem = desc;
    this.catalogo.cdItem= codigo;
    this.catalogo.quantidade= quantidade;
    this.itensAdd.push(this.catalogo);
    this.listaItensBecAdicionados.emit(this.itensAdd);
  }

  deletarMaterial(key: String) {
    this.itensMaterial.forEach((value,index)=>{
      if(value.cdMaterial==key) this.itensMaterial.splice(index,1);
    });

   // const index = this.itensAdd.indexOf(this.catalogo.cdItem == id);
    //this.itensAdd.splice(index, 1);
   // this.itensAdd = this.itensAdd.filter(this.catalogo => this.catalogo.cdItem !== id);
    //delete this.itensAdd[id];
  }

  deletarServico(key: String) {
    this.itensServico.forEach((value,index)=>{
      if(value.cdServico==key) this.itensServico.splice(index,1);
    });
  }

  deletar(key: number) {
    this.itensAdd.forEach((value,index)=>{
      if(value.cdItem==key) this.itensAdd.splice(index,1);
    });

    
   // const index = this.itensAdd.indexOf(this.catalogo.cdItem == id);
    //this.itensAdd.splice(index, 1);
   // this.itensAdd = this.itensAdd.filter(this.catalogo => this.catalogo.cdItem !== id);
    //delete this.itensAdd[id];
  }

  limpar() {
    this.itensMaterial = []
    this.itensServico = []
  }

  pesquisarMaterial(desc: String, codigo: String) {
    if(codigo != null){
      this.catalogoBecService.pesquisarMaterialCodigo(codigo)
      .then(material => {
        this.material = material;
        this.material.cdMaterial= material['codigo'];
        console.log(desc);
        this.itensMaterial = material;

      }).catch(error => this.errorService.handle(error));
    }
    if(desc != null){
        this.catalogoBecService.pesquisarMaterial(desc)
        .then(material => {
          this.material = material;
          this.material.txDescricaoItem = material['desc'];
          console.log(this.material);
          this.itensMaterial = material;

        }).catch(error => this.errorService.handle(error));
      }
  }

  pesquisarMaterialCodigo(codigo: String) {
    this.catalogoBecService.pesquisarMaterialCodigo(codigo)
    .then(material => {
      this.material = material;
      this.material.cdMaterial = material['codigo'];
      console.log(this.material);
      this.itensMaterial = material;

    }).catch(error => this.errorService.handle(error));
  }

  pesquisarServico(desc: String, codigo: String) {
      if(codigo != null){
        this.catalogoBecService.pesquisarServico(codigo)
        .then(servico => {
          this.servico = servico;
          this.servico.cdServico = servico['codigo'];
          console.log(this.servico);
          this.itensServico = servico;
  
        }).catch(error => this.errorService.handle(error));
    }
    if(desc != null){
      this.catalogoBecService.pesquisarServico(desc)
      .then(servico => {
        this.servico = servico;
        this.servico.txDescricaoItem = servico['desc'];
        console.log(this.servico);
        this.itensServico = servico;

      }).catch(error => this.errorService.handle(error));
    }
  }

  pesquisarServicoCodigo(codigo: String) {
    this.catalogoBecService.pesquisarServicoCodigo(codigo)
    .then(servico => {
      this.servico = servico;
      this.servico.cdServico = servico['codigo'];
      console.log(this.servico);
      this.itensServico = servico;

    }).catch(error => this.errorService.handle(error));
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

}

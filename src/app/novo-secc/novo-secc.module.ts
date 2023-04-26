import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo-secc.component';
import { NovoSeccService } from './services/novo-secc.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

import { AppRoutingModule } from '../app-routing.module';
import { VisualizaDocumentoSeccService } from '../visualiza-documento-secc/visualiza-documento-secc.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CoreModule } from '../core/core.module';
import { BlockUIModule } from 'primeng/blockui';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageModule } from '../message/message.module';
import { PreVisualizacaoComponent } from './pre-visualizacao/pre-visualizacao.component';
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { CatalogoBecComponent } from './catalogo/catalogo-bec/catalogo-bec.component';

@NgModule({
  declarations: [
    NovoComponent,
    PreVisualizacaoComponent,
    CatalogoBecComponent
  ],
  
  imports: [
    CommonModule,
    BrowserModule,
    InputTextModule, 
    DropdownModule,
    BrowserAnimationsModule,
    CheckboxModule,
    EditorModule,
    PanelModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DividerModule,
    FormsModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    BlockUIModule,
    CoreModule,
    DynamicDialogModule,
    MessageModule,
    NgxExtendedPdfViewerModule,
    SplitButtonModule,
    TooltipModule
    
  ],
  providers:[
    NovoSeccService,
    VisualizaDocumentoSeccService
  ]
})
export class NovoSeccModule { }

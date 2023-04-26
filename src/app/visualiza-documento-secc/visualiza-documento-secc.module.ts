import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizaDocumentoSeccComponent } from './visualiza-documento-secc.component';
import { NovoSeccService } from '../novo-secc/services/novo-secc.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';

import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { BlockUIModule } from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from '../app-routing.module';
import { DialogSeccModule } from '../dialog-secc/dialog-secc.module';
import { AssinarModule } from '../assinar/assinar.module';
import { MovimentacaoModule } from '../movimentacao/movimentacao.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { FuncoesComponent } from './funcoes/funcoes.component';

@NgModule({
  declarations: [
    VisualizaDocumentoSeccComponent,
    FuncoesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    MenuModule,
    BlockUIModule,
    ProgressSpinnerModule,
    RouterModule,
    DialogModule,
    TableModule,
    InputTextModule,
    CoreModule,
    AppRoutingModule,
    DialogSeccModule,
    AssinarModule,
    MovimentacaoModule,
    DynamicDialogModule,
    ToastModule
  ],
  providers: [
    NovoSeccService,
  ],
})
export class VisualizaDocumentoSeccModule { }

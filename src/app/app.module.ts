import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { SeccModule } from './secc/secc.module';
import { NovoSeccModule } from './novo-secc/novo-secc.module';
import { MesaSeccModule } from './mesa-secc/mesa-secc.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NovoSeccService } from './novo-secc/services/novo-secc.service';

import { CoreModule } from './core/core.module';
import { VisualizaDocumentoSeccModule } from './visualiza-documento-secc/visualiza-documento-secc.module';
import { AssinarModule } from './assinar/assinar.module';
import { SegurancaModule } from './core/seguranca/seguranca.module';

import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { DialogSeccModule } from './dialog-secc/dialog-secc.module';
import { MessageModule } from './message/message.module';

@NgModule({ 
  declarations: [
    AppComponent,
    NavbarComponent,
    MovimentacaoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SeccModule,
    NovoSeccModule,
    MesaSeccModule,
    DialogSeccModule,
    VisualizaDocumentoSeccModule,
    AssinarModule,
    HttpClientModule,  
    ConfirmDialogModule,
    CoreModule,
    MessageModule,

    SegurancaModule,

    ChipModule,
    BreadcrumbModule
    
  ],
  providers: [
    NovoSeccService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 

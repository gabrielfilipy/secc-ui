import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorService } from './error.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AppRoutingModule } from '../app-routing.module';

import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';

import { MensagemSistemaComponent } from './mensagem-sistema/mensagem-sistema.component';
import { AuthService } from './seguranca/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    PaginaNaoEncontradaComponent,
    MensagemSistemaComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    CardModule,
    AppRoutingModule,
    DialogModule,
    HttpClientModule,
    ChipModule,
    InputTextModule,
    FormsModule,
    AccordionModule,
    DynamicDialogModule,

  ],
  exports: [
    ToastModule
  ],
  providers: [
    ErrorService,
    MessageService,
    AuthService,
    Title
  ]
})
export class CoreModule { }
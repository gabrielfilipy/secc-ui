import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentacaoService } from './movimentacao.service';
import { CossignatarioComponent } from './cossignatario/cossignatario.component';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogSeccModule } from '../dialog-secc/dialog-secc.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AdicionarCossignatarioComponent } from './cossignatario/adicionar-cossignatario/adicionar-cossignatario.component';

@NgModule({
  declarations: [
    CossignatarioComponent,
    AdicionarCossignatarioComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    PanelModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DialogSeccModule,
    DynamicDialogModule
  ],
  providers: [ MovimentacaoService ],
  exports: [ CossignatarioComponent ]
})
export class MovimentacaoModule { }

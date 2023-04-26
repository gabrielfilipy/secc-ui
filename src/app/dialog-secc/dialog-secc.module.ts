import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualizaDocumentoSeccComponent } from '../visualiza-documento-secc/visualiza-documento-secc.component';


@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    RouterModule,
    DynamicDialogModule
  ],
  exports: [ DialogComponent ],
  providers: [ DynamicDialogRef, DynamicDialogConfig ],
  entryComponents: [VisualizaDocumentoSeccComponent]
})
export class DialogSeccModule { }

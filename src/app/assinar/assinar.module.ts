import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { AssinarComponent } from './assinar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton'; 
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SenhaComponent } from './senha/senha.component';


@NgModule({
  declarations: [ AssinarComponent, SenhaComponent ],
  imports: [
    CommonModule,
    PanelModule,
    CardModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    RouterModule,
    ProgressSpinnerModule,
    BlockUIModule,
    DynamicDialogModule,
    CoreModule 
  ],
  exports: [ AssinarComponent ]
})
export class AssinarModule { }
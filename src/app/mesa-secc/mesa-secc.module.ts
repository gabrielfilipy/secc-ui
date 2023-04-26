import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesaSeccComponent } from './mesa-secc/mesa-secc.component';
import { SeccService } from '../secc/services/secc.service';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CoreModule } from '../core/core.module';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    MesaSeccComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    SelectButtonModule,
    RouterModule,
    ProgressSpinnerModule,
    CoreModule,
    AccordionModule,
    BadgeModule,
    BlockUIModule,
    DialogModule

  ],
  providers:[
    SeccService
  ]
})
export class MesaSeccModule { }
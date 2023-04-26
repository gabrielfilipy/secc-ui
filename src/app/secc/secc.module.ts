import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccService } from './services/secc.service';
import { Secc } from '../shared/models/secc.model';

const LS_CHAVE: string ="secc"

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SeccService
  ]
})
export class SeccModule { }

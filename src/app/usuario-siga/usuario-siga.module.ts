import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioSigaService } from './usuario-siga.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  providers: [ UsuarioSigaService ]
})
export class UsuarioSigaModule { }

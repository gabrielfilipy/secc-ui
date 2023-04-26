import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FooterComponent } from './footer.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ FooterComponent ],
  imports: [
    CommonModule,
    CoreModule,
    ButtonModule
  ]
})
export class FooterModule { }

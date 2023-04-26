import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NavbarComponent } from './navbar.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ NavbarComponent ],
  imports: [
    CommonModule,
    ChipModule,
    BreadcrumbModule,
    
    CoreModule
  ]
})
export class NavbarModule { } 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SeccHttp } from './seccHttp';
import { AuthGuard } from './auth.guard';
import { CoreModule } from '../core.module';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    CoreModule,
    DynamicDialogModule,
    DialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => { 
          const name = environment.tokenAmbienteSiga;
          let ca: Array<string> = document.cookie.split(';');
          let caLen: number = ca.length;
          let cookieName = `${name}=`;
          let c: string;

          for (let i: number = 0; i < caLen; i += 1) {
              c = ca[i].replace(/^\s+/g, '');
              if (c.indexOf(cookieName) == 0) {
                  var value = c.substring(cookieName.length, c.length)
                  return value;
              }
          }
          
          return ''
        },
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: [environment.apiUrl + '/autenticar']
                            
      }
    })

  ], 
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SeccHttp,
      multi: true 
    },
    AuthGuard
  ]

})

export class SegurancaModule { 
  
}

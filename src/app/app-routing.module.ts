import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssinarComponent } from './assinar/assinar.component';
import { LoginComponent } from './core/login/login.component';
import { MensagemSistemaComponent } from './core/mensagem-sistema/mensagem-sistema.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthGuard } from './core/seguranca/auth.guard';
import { MesaSeccComponent } from './mesa-secc/mesa-secc/mesa-secc.component';
import { NovoComponent } from './novo-secc/novo-secc.component';
import { VisualizaDocumentoSeccComponent } from './visualiza-documento-secc/visualiza-documento-secc.component';

const routes: Routes = [ 
  { 
    path: '', redirectTo: 'mesa', pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    data: { titulo: 'Login' }
  },
  { 
    path: 'mesa', 
    component: MesaSeccComponent, 
    data: { titulo: 'Mesa' }
  },
  { 
    path: 'novo', 
    component: NovoComponent, 
    data: { titulo: 'Criar documento' }
  },
  { 
    path: 'editar/:sigla', 
    component: NovoComponent, 
    data: { titulo: 'Editar documento' }
  },
  { 
    path: 'visualizar/:sigla', 
    component: VisualizaDocumentoSeccComponent, 
    data: { titulo: 'Visualizar documento' },
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'pagina-nao-encontrada', 
    component: PaginaNaoEncontradaComponent, 
    data: { titulo: 'Página não encontrada' } 
  },
  { 
    path: 'assinar/:sigla', 
    component: AssinarComponent, 
    data: { titulo: 'Assinar documento' },
    canActivate: [ AuthGuard ]
  },
  { 
    path: 'mensagem-sistema/:msg', 
    component: MensagemSistemaComponent, 
    data: { titulo: 'Mensagem do sistema' },
    canActivate: [ AuthGuard ]
  },
  { 
    path: '**', redirectTo: 'pagina-nao-encontrada' 
  } 
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

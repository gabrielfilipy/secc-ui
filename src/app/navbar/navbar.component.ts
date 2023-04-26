import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../core/mode';
import { AuthService } from '../core/seguranca/auth.service';
import { UsuarioSigaService } from '../usuario-siga/usuario-siga.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pessoa = new Pessoa();
  items: any;
  ambiente!: string;

  constructor(
    public authService : AuthService,
    public usuarioService : UsuarioSigaService
  ) { }

  ngOnInit(): void {
    this.buscarUsuarioLogado();
  }

  buscarUsuarioLogado() {
    this.ambiente = environment.ambienteSecc;
    this.usuarioService.buscarUsuario(this.authService.jwtPayload?.sub)
      .then(response => {
        this.pessoa.sigla = response.sigla;
        this.pessoa.nome = response.nome;
      })
  }

  logout() { 
    window.location.replace(`${environment.apiSigaUrl}/sigaex/app/mesa2`);
    ///this.router.navigate(['/login'])
  }

}
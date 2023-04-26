import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../seguranca/auth.service';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  redirectToSiga() {
    //window.location.replace(`${environment.apiSigaUrl}/sigaex/app/mesa2`);
  }

}

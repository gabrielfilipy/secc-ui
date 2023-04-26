import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../error.service';
import { Login } from '../mode';
import { AuthService } from '../seguranca/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Login();

  constructor(
    public authService : AuthService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.usuario)
      .then(() => {
        this.router.navigate(['/mesa']);
      }).catch(error => this.errorService.handle(error));
  }

}

import {Component, OnInit} from '@angular/core';
import {FooterContent2Component} from "../../public/footer-content-2/footer-content-2.component";
import {Login} from "../models/login-model/login.model";
import {PetnationApiService} from "../../content/services/petnation-api.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterContent2Component,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginData: Login = new Login('', '');

  constructor(private petnationApiService: PetnationApiService, private router: Router ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.petnationApiService.loginUser(this.loginData).subscribe(
      (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        alert('¡Inicio de sesión exitoso!');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Correo electrónico o contraseña incorrectos');
      }
    );
  }
}

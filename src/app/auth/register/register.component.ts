import {Component, OnInit} from '@angular/core';
import {Register} from "../models/register-model/register.model";
import {PetnationApiService} from "../../content/services/petnation-api.service";
import {FormsModule} from "@angular/forms";
import {FooterContent2Component} from "../../public/footer-content-2/footer-content-2.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    FooterContent2Component
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userData: Register = new Register('', '', '');

  constructor(private petnationApiService: PetnationApiService, private router: Router) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.petnationApiService.createUser(this.userData).subscribe(
      (response) => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
      }
    );
  }
}

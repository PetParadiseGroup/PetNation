import {Component, OnInit} from '@angular/core';
import {Register} from "../models/register-model/register.model";
import {PetnationApiService} from "../../content/services/petnation-api.service";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FooterContent2Component} from "../../public/footer-content-2/footer-content-2.component";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    FooterContent2Component,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(private petnationApiService: PetnationApiService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      confirmContrasenia: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: AbstractControl) {
    let pass = group.get('contrasenia')?.value;
    let confirmPass = group.get('confirmContrasenia')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const userData: Register = new Register(
        this.registerForm.get('nombre')?.value,
        this.registerForm.get('correoElectronico')?.value,
        this.registerForm.get('contrasenia')?.value
      );

      this.petnationApiService.createUser(userData).subscribe(
        (response) => {
          alert('Usuario registrado con éxito');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar usuario');
        }
      );
    } else {
      alert('Por favor, rellene todos los campos correctamente.');
    }
  }
}

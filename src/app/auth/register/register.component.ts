import {Component, OnInit} from '@angular/core';
import {Register} from "../models/register-model/register.model";
import {PetnationApiService} from "../../content/services/petnation-api.service";
import {FormsModule} from "@angular/forms";
import {FooterContent2Component} from "../../public/footer-content-2/footer-content-2.component";

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
  userData!: Register;
  constructor(private petnationeApiService : PetnationApiService) {
    this.userData = {} as Register; //Inicializa userData
  }

  ngOnInit(): void {}

  onRegister(){
    console.log(this.userData);
    this.petnationeApiService.createUser(this.userData).subscribe(
      (response) => {
        console.log(response);
        alert('Usuario registrado con éxito')
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

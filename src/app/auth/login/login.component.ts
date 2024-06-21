import { Component } from '@angular/core';
import {FooterContent2Component} from "../../public/footer-content-2/footer-content-2.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterContent2Component
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

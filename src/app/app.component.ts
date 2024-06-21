import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderContentComponent} from "./public/header-content/header-content.component";
import {FooterContentComponent} from "./public/footer-content/footer-content.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderContentComponent, FooterContentComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PetNation';

  showNavFooter: boolean = true;


  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavFooter = !(event.url === '/login'|| event.url === '/register');
      }
    });

  }
}

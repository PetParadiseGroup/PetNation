import { Component } from '@angular/core';
import {PublicationsComponent} from "../../components/publications/publications.component";
import {PostPublicationComponent} from "../../components/post-publication/post-publication.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PublicationsComponent,
    PostPublicationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle
} from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { PetnationApiService } from '../../services/petnation-api.service';
import { Publications } from '../../models/publications-model/publications.model';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {PostPublicationComponent} from "../post-publication/post-publication.component";

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatCardFooter,
    MatCardAvatar,
    MatIcon,
    NgForOf,
    MatCardTitle,
    MatCardSubtitle,
    NgOptimizedImage,
    PostPublicationComponent
  ],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: Publications[] = [];

  constructor(private petnationApiService: PetnationApiService) {}

  ngOnInit() {
    this.petnationApiService.getPublications().subscribe(
      (data: Publications[]) => {
        this.publications = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching publications', error);
      }
    );
  }
}

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
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PostPublicationComponent} from "../post-publication/post-publication.component";
import {User} from "../../models/user-model/user.model";
import {catchError, forkJoin, map, of, switchMap} from "rxjs";

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
    PostPublicationComponent,
    NgIf
  ],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: (Publications & { user?: User })[] = [];

  constructor(private petnationApiService: PetnationApiService) {}

  ngOnInit() {
    this.petnationApiService.getPublications().pipe(
      switchMap(publications => {
        const userObservables = publications.map(publication =>
          this.petnationApiService.getUserById(publication.usuario_id).pipe(
            map(user => ({ ...publication, user })),
            catchError(error => {
              if (error.status === 404) {
                console.error(`User with ID ${publication.usuario_id} not found.`);
              } else {
                console.error(`Error fetching user with ID ${publication.usuario_id}:`, error);
              }
              return of({ ...publication });
            })
          )
        );
        return forkJoin(userObservables);
      })
    ).subscribe(
      (data) => {
        this.publications = data;
      },
      (error) => {
        console.error('Error fetching publications or users', error);
      }
    );
  }
}

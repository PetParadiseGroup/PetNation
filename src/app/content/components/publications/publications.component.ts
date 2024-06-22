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
import {Comentario, Publications} from '../../models/publications-model/publications.model';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PostPublicationComponent} from "../post-publication/post-publication.component";
import {User} from "../../models/user-model/user.model";
import {catchError, forkJoin, map, Observable, of, switchMap} from "rxjs";
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
    NgIf,
    AsyncPipe,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: (Publications & { user?: User, comentarios?: (Comentario & { user?: User })[] })[] = [];
  isLoading: boolean = true;
  texto: string = '';
  constructor(private petnationApiService: PetnationApiService) { }

  ngOnInit() {
    this.loadPublications();
  }

  loadPublications(): void {
    this.petnationApiService.getPublications().subscribe(
      (publications) => {
        this.publications = publications;

        forkJoin(this.loadUsersForPublications(publications)).subscribe(
          () => {
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching user data', error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error('Error fetching publications', error);
        this.isLoading = false;
      }
    );
  }

  loadUsersForPublications(publications: Publications[]): Observable<any>[] {
    return publications.map(publication => {
      const userRequests = [];

      userRequests.push(
        this.petnationApiService.getUserById(publication.usuario_id).pipe(
          map((user) => {
            (publication as any).user = user;  // Use 'any' to add the user property
          }),
          catchError((error) => {
            if (error.status === 404) {
              console.error(`User with ID ${publication.usuario_id} not found.`);
            } else {
              console.error(`Error fetching user with ID ${publication.usuario_id}:`, error);
            }
            return of(null); // Devuelve null en caso de error
          })
        )
      );


      publication.comentarios.forEach(comment => {
        userRequests.push(
          this.petnationApiService.getUserById(comment.usuario_id).pipe(
            map((user) => {
              (comment as any).user = user;  // Use 'any' to add the user property
            }),
            catchError((error) => {
              if (error.status === 404) {
                console.error(`User with ID ${comment.usuario_id} not found.`);
              } else {
                console.error(`Error fetching user with ID ${comment.usuario_id}:`, error);
              }
              return of(null); // Devuelve null en caso de error
            })
          )
        );
      });

      return forkJoin(userRequests);
    });
  }


  async createComment(id: string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const usuario_id = currentUser._id;
    const fecha_creacion = this.formatDate(new Date());


    const commentData = {
      usuario_id: usuario_id,
      texto: this.texto,
      fecha_creacion: fecha_creacion,
    };

    this.petnationApiService.addComment(id,commentData).subscribe(
      (response) => {
        this.texto = '';
        window.location.reload();
      },
      (error) => {
        console.error('Error al crear comentario:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}

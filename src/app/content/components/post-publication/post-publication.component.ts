import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {PetnationApiService} from "../../services/petnation-api.service";
import {FormsModule} from "@angular/forms";
import {Publications} from "../../models/publications-model/publications.model";
@Component({
  selector: 'app-post-publication',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatCardTitle,
    NgxDropzoneModule,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './post-publication.component.html',
  styleUrl: './post-publication.component.css'
})
export class PostPublicationComponent implements OnInit {
  contenido: string = '';
  files: File[] = [];
  disableButton = true;

  constructor(private http: HttpClient, private apiService: PetnationApiService) {}

  ngOnInit(): void {
  }

  onSelect(event: any) {
    this.disableButton = false;
    if (this.files.length) this.files.splice(this.files.indexOf(event), 1);
    this.files.push(event.addedFiles[0]);
  }

  onRemove(event: any) {
    this.disableButton = true;
    this.files.splice(this.files.indexOf(event), 1);
  }

  async crearPublicacion() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const usuario_id = currentUser._id;
    const fecha_creacion = this.formatDate(new Date());

    let img_url = '';
    if (this.files.length > 0) {
      img_url = await this.uploadImage();
    }

    const publicacionData = {
      usuario_id: usuario_id,
      contenido: this.contenido,
      fecha_creacion: fecha_creacion,
      img_url: img_url,
      likes: [],
      comentarios: []
    };

    this.apiService.createPublications(publicacionData).subscribe(
      (response) => {
        this.contenido = '';
        this.files = [];
        this.disableButton = true;
        window.location.reload();
      },
      (error) => {
        console.error('Error al crear publicación:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
      }
    );
  }

  async uploadImage() {
    const api = "https://api.imgbb.com/1/upload?expiration=300&key=554e6f0df38c00a62b14d925142b89ca";
    const file = this.files[0];
    const data = new FormData();
    data.append('image', file);

    try {
      const response = await this.http.post<any>(api, data).toPromise();
      return response.data.url;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return '';
    }
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

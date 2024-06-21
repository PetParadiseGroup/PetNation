import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Register} from "../../auth/models/register-model/register.model";
import {Publications} from "../models/publications-model/publications.model";

@Injectable({
  providedIn: 'root'
})
export class PetnationApiService {
  private apiUrl = 'http://20.197.231.48'; // Coloca aquí la URL base de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener publicaciones
  getPublications(): Observable<any> {
    const url = `${this.apiUrl}/publicaciones`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // Método privado para manejar errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('An error occurred:', error.error.message);
    } else {
      // El servidor retornó un código de error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Retornar un observable con un mensaje de error descriptivo
    return throwError(
      'Something bad happened; please try again later.');
  }

  createUser(item: any): Observable<Register> {
    const url: string = `${this.apiUrl}/register`;
    return this.http.post<Register>(url, item)
      .pipe(retry(2), catchError(this.handleError));
  }


}

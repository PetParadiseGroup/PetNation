import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {catchError, Observable, throwError, forkJoin, retry} from "rxjs";
import { Register } from "../../auth/models/register-model/register.model";
import { Publications } from "../models/publications-model/publications.model";
import { User } from '../models/user-model/user.model';
import {Login} from "../../auth/models/login-model/login.model";

@Injectable({
  providedIn: 'root'
})
export class PetnationApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getPublications(): Observable<Publications[]> {
    const url = `${this.apiUrl}/publicaciones`;
    return this.http.get<Publications[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: string): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError)
    );
  }


  createPublications(publicationData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; // Add any other headers your server might require
    const body = JSON.stringify(publicationData);
    return this.http.post<any>(`${this.apiUrl}/publicaciones`, body, { headers: headers });
  }

  addComment(postId: string, commentData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(commentData);
    return this.http.post<any>(`${this.apiUrl}/publicaciones/${postId}/comentarios`, body, { headers: headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  createUser(userData: Register): Observable<User> {
    const url: string = `${this.apiUrl}/register`;
    return this.http.post<User>(url, userData)
      .pipe(
        catchError(this.handleError)
      );
  }
  loginUser(loginData: Login): Observable<User> {
    const url: string = `${this.apiUrl}/login`;
    return this.http.post<User>(url, loginData)
      .pipe(
        catchError(this.handleError)
      );
  }
}

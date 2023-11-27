import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  sendEmail(mailMessage: any) {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');

    if (mailMessage) {
      headers = headers.set('Content-Type', 'application/json');
    }


    return this.http.post(this.baseUrl + 'email', mailMessage, {headers}) .pipe(
      catchError(this.handleError)
    );



  }

  sendContactEmail(mail: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    if (mail) {
      headers = headers.set('Content-Type', 'application/json');
    }
    return this.http.post(this.baseUrl + 'email/contact', mail, {headers}).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // You can handle different types of errors here
    // For example, you can log the error or display a user-friendly message
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }


} 
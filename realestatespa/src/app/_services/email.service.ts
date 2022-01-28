import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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

    this.http.post( this.baseUrl + 'email', mailMessage, {
      headers
    }).subscribe(result => {
      console.log("Email sent!");
    });

  }

} 
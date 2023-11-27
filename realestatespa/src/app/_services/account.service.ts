import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ForgotPassword } from '../_models/forgotPassword';
import { ReplaySubject, throwError } from 'rxjs';
import { CustomEncoder } from '../_models/customEncoder';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  callback = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

constructor(private http: HttpClient) { }

  login(modelLogin: any) {
    return this.http.post(this.baseUrl + 'account/login', modelLogin).pipe(
      map((response: User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(modelRegister: any){
    return this.http.post(this.baseUrl + 'account/register', modelRegister).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      }),
      catchError(this.handleError)
    )
  }

  forgotPassword(forgotPassword:ForgotPassword){
    return this.http.post(this.baseUrl + 'account/forgotpassword', forgotPassword).pipe(
      catchError(this.handleError)
    );
    
  }

  public confirmEmail(
    token: string, email: string){
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    console.log(params);
    console.log(params.get('token'));
    console.log(params.get('email'));
    
    return this.http.get(this.baseUrl + 'account/emailconfirmation', { params: params }) .pipe(
      catchError(this.handleError)
    );
  }


  public resetPassword (resetPassModel:any){
    return this.http.post(this.baseUrl + 'account/resetpassword', resetPassModel);
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    // You can handle different types of errors here
    // For example, you can log the error or display a user-friendly message
    console.error('An error occurred:', error);
    console.error (error.status);
    if(error.status===400){

    }
    return throwError('Something went wrong. Please try again later.');
  }

}

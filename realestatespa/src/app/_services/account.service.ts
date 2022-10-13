import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ForgotPassword } from '../_models/forgotPassword';
import { ReplaySubject } from 'rxjs';
import { CustomEncoder } from '../_models/customEncoder';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
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
      })
    )
  }

  forgotPassword(forgotPassword:ForgotPassword){
    return this.http.post(this.baseUrl + 'account/forgotpassword', forgotPassword)
    
  }

  public confirmEmail(
    token: string, email: string){
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    console.log(params);
    console.log(params.get('token'));
    console.log(params.get('email'));
    
    return this.http.get(this.baseUrl + 'account/emailconfirmation', { params: params });
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

}

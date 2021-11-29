import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MustMatch } from './password-validator';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  //modelLogin: any = {};
  modelRegister: any = {};
   emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$";
  registerForm:FormGroup;
  //loginForm:FormGroup;
  form: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private fb: FormBuilder) {

    this.registerForm = fb.group({
      firstName:[null,[Validators.required, Validators.minLength(1)]],
      lastName:[null,[Validators.required, Validators.minLength(1)]],
      email:[null,[Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password','confirmPassword')
    })


    // this.loginForm = fb.group({
    //   email:[null,[Validators.required]],
    //   password:[null,[Validators.required]]
    // })


  }

  ngOnInit() :void{


  }



  /* login() {

    this.modelLogin.email = this.loginForm.value.email;
    this.modelLogin.password = this.loginForm.value.password;
    this.accountService.login(this.modelLogin).subscribe(response => {
      console.log(response);

    }, error => {
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();

  } */

  // setCurrentUser(){
  //   const user: User =JSON.parse(localStorage.getItem('user'));
  //   this.accountService.setCurrentUser(user);
  // }



  register(){


    this.modelRegister.email = this.registerForm.value.email;
    this.modelRegister.firstName = this.registerForm.value.firstName;
    this.modelRegister.lastName = this.registerForm.value.lastName;
    this.modelRegister.password = this.registerForm.value.password;


    this.accountService.register(this.modelRegister).subscribe(response =>{
      console.log(response);
      this.cancel();
    })

  }

  get f() {
    return this.registerForm.controls;
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}


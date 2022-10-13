import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './password-validator';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  
  modelRegister: any = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$";
  clienURI = 'http://192.168.0.28:4200/emailconfirmation';
  registerForm:UntypedFormGroup;
  
  form: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private accountService: AccountService, private fb: UntypedFormBuilder, private router: Router) {

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

  }

  ngOnInit(){
    this.redirect_register();
  }


  async redirect(){
    await this.router.navigate(['confirmationsent']);
  }

  register(){

    this.modelRegister.email = this.registerForm.value.email;
    this.modelRegister.firstName = this.registerForm.value.firstName;
    this.modelRegister.lastName = this.registerForm.value.lastName;
    this.modelRegister.password = this.registerForm.value.password;
    this.modelRegister.clientURI = this.clienURI;
    this.accountService.register(this.modelRegister).subscribe({
      next: (_) =>{ this.redirect()},
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    })
  }

  async redirect_register(){
    window.scroll(-1000000,-1000000);
    if(!localStorage.getItem('direct')){
      localStorage.setItem('direct', 'no reload')
      location.reload();
    } else {
      localStorage.removeItem('direct');
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}


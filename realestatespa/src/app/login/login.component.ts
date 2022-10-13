import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 modelLogin: any = {};
 loginForm:FormGroup;

  constructor(public accountService: AccountService,private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    
    this.loginForm = fb.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
   }

  ngOnInit(){
    this.redirect_login()
  }


  login() {
    this.modelLogin.email = this.loginForm.value.email;
    this.modelLogin.password = this.loginForm.value.password;
    this.accountService.login(this.modelLogin).subscribe(response => {
      console.log(response);
      this.redirect();
    }, error => {
      console.log(error);
    })   
  }


  async redirect_login(){
      window.scroll(-1000000,-1000000);
      if(!localStorage.getItem('direct')){
        localStorage.setItem('direct', 'no reload')
        location.reload();
      } else {
        localStorage.removeItem('direct');
      }
    }

  async redirect(){
    await this.router.navigate(['builder-listing']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})

export class NavbarComponent implements OnInit {

  modelLogin: any = {};
  loginForm:FormGroup;
      
  constructor(public accountService: AccountService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {

    this.loginForm = fb.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
  }

  ngOnInit() {
  }

  async dropdown(){
    let clicked:boolean =true;

  }


  // login() {

    // this.modelLogin.email = this.loginForm.value.email;
    // this.modelLogin.password = this.loginForm.value.password;
    // this.accountService.login(this.modelLogin).subscribe(response => {
      // console.log(response);

    // }, error => {
      // console.log(error);
    // })
    // 
    // 
  // }

  logout(){
    this.accountService.logout();

  }

} 
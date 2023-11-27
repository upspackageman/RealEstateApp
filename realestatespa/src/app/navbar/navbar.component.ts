import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
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
  loginForm:UntypedFormGroup;
      
  constructor(public accountService: AccountService, private fb: UntypedFormBuilder, private router: Router, private toastr: ToastrService) {

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


  logout(){
    console.log(this.accountService)
    this.accountService.logout();

  }

  

} 
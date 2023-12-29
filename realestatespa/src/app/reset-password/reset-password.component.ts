import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MustMatch } from '../loginregister/password-validator';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: UntypedFormGroup;
  showSuccess: boolean;
  showError: boolean = false;
  errorMessage: string;
  modelResetPassword: any = {};

  private token: string;
  private email: string;

  constructor(public accountService: AccountService, private fb: UntypedFormBuilder, private route: ActivatedRoute) {
    this.resetPasswordForm = fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password','confirmPassword')
    })

   }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }


  reset(){
  
    this.modelResetPassword.password = this.resetPasswordForm.value.password;
    this.modelResetPassword.confirmPassword = this.resetPasswordForm.value.confirmPassword;
    this.modelResetPassword.token = this.token;
    this.modelResetPassword.email = this.email;
    this.accountService.resetPassword(this.modelResetPassword).subscribe({
      next: (_) =>{ 
        this.showSuccess = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ForgotPassword } from '../_models/forgotPassword';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: UntypedFormGroup
  successMessage: string = '';
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;

  constructor(public accountService: AccountService) {
    this.forgotPasswordForm = new UntypedFormGroup({
      email: new UntypedFormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  public forgotPassword() {
    this.showError = this.showSuccess = false;

    const forgotPassDto: ForgotPassword = {
      email: this.forgotPasswordForm.value.email,
      clientURI: 'http://192.168.0.28:4200/resetpassword'
    }

    this.accountService.forgotPassword(forgotPassDto)
      .subscribe({
        next: (_) => {
          this.showSuccess = true;
          this.successMessage = 'The link has been sent, please check your email to reset your password.'
          console.log(this.successMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = err.message;
          console.log(this.errorMessage);
        }
      })
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ForgotPassword } from '../_models/forgotPassword';
import { AccountService } from '../_services/account.service';
import { environment } from 'src/environments/environment';

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
    this.showFooter();
  }


  showFooter(){
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    link.style.display="flex";
 
}

  public forgotPassword() {
    this.showError = this.showSuccess = false;

    const forgotPassDto: ForgotPassword = {
      email: this.forgotPasswordForm.value.email,
      clientURI: environment.apiUrl+'resetpassword'
    }

    this.accountService.forgotPassword(forgotPassDto)
      .subscribe({
        next: (_) => {
          this.showSuccess = true;
          this.successMessage = 'The link has been sent, please check your email to reset your password.';
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = err.message;
          console.log(err);
        }
      })
  }
}

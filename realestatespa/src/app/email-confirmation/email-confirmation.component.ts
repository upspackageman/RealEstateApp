import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  successMessage: string = "";

  constructor(private accountService: AccountService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
    this.showFooter();
  }

  showFooter(){
    
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    console.log(link);
    link.style.display="flex";
 
}

  

  

  private confirmEmail() {
    this.showError = this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    this.accountService.confirmEmail(token, email)
      .subscribe({
        next: (_) => {
          this.showSuccess = true,
          this.successMessage = "Your account is now activated";
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = err.message;
          this.successMessage = this.errorMessage;
        }
      })
  }

}

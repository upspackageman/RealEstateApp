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
  loginForm: FormGroup;

  constructor(public accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) {

    this.loginForm = fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit() {
  this.showFooter();
  }
  showFooter(){
    
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    console.log(link);
    link.style.display="flex";
 
}

  login() {
    this.modelLogin.email = this.loginForm.value.email;
    this.modelLogin.password = this.loginForm.value.password;
    this.accountService.login(this.modelLogin).subscribe(_ => {
      
      this.redirect();
    }, error => {
      console.log(error);
    })
  }


  // async redirect_login() {

  //   if (!localStorage.getItem('direct')) {
  //     localStorage.setItem('direct', 'no reload')
  //     this.redirect();
  //   //   const currentUrl = this.router.url;
  //   //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //   //   this.router.navigate([currentUrl]);
      
  //   // });
  //   } else {
     
  //     localStorage.removeItem('direct');
  //     this.redirect();
  //   }
  // }

  async redirect() {
    await this.router.navigate(['builder-listing']);
  }


  

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { CustomErrorComponent } from '../custom-alert/custom-error/custom-error.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private route: Router) {

  }
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.toastr.error('Please login or Register', 'Not Authorized', {
          toastComponent: CustomErrorComponent,
          progressBar: true,
          timeOut: 5000
        }), this.route.navigate(['/']);


      })
    )
  }

}

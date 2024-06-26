import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomErrorComponent } from '../custom-alert/custom-error/custom-error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              } else {
                this.toastr.error(error.statusText === "OK" ? "Bad Request" : error.statusText+"\nEmail/Username Not Present", error.status, {
                  toastComponent: CustomErrorComponent,
                  progressBar: true,
                  timeOut: 5000
                });
              }
              break;
            case 401:
              this.toastr.error(error.statusText === "OK" ? "Unauthorized" : error.statusText+"\nEmail/Password Not Valid", error.status, {
                toastComponent: CustomErrorComponent,
                progressBar: true,
                timeOut: 5000
              });
              break;
            case 404:
              this.router.navigateByUrl('not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('server-error', navigationExtras);
              break;
            default:
              this.toastr.error('An Error occurred', '', {
                toastComponent: CustomErrorComponent,
                progressBar: true,
                timeOut: 5000
              });
              console.log(error);
              break;
          }

        }
        return throwError(error);
      })
    )
  }
}

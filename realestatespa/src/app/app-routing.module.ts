import { LoginregisterComponent } from './loginregister/loginregister.component';
import { ForsaleComponent } from './forsale/forsale.component';
import { BuilderListingsComponent } from './builder-listings/builder-listings.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { AboutComponent } from './about/about.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ConfirmationSentComponent } from './confirmation-sent/confirmation-sent.component';
import { TermsPolicyComponent } from './terms-policy/terms-policy.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'forsale', component: ForsaleComponent},
  {path: 'builder-listing', component: BuilderListingsComponent,canActivate:[AuthGuard] },
  {path: 'about', component: AboutComponent},
  {path: 'loginregister', component: LoginregisterComponent},
  {path: 'listing/:id', component: ListingDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'emailconfirmation', component: EmailConfirmationComponent },
  { path: 'confirmationsent', component: ConfirmationSentComponent },
  { path: 'terms/:id', component: TermsPolicyComponent },
  {path: '**', component: NotFoundComponent, pathMatch: 'full',redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload', paramsInheritanceStrategy:'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'forsale', component: ForsaleComponent},
  {path: 'builder-listing', component: BuilderListingsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'loginregister', component: LoginregisterComponent},
  {path: 'listing/:id', component: ListingDetailComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload', paramsInheritanceStrategy:'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

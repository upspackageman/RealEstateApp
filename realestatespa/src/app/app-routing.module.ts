import { LoginregisterComponent } from './loginregister/loginregister.component';
import { ForsaleComponent } from './forsale/forsale.component';
import { BuilderListingsComponent } from './builder-listings/builder-listings.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'forsale', component: ForsaleComponent},
  {path: 'builder-listing', component: BuilderListingsComponent},
  {path: 'loginregister', component: LoginregisterComponent},
  {path: 'listing/:id', component: ListingDetailComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload', paramsInheritanceStrategy:'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

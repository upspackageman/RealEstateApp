import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { HomeComponent } from './home/home.component';
import { ForsaleComponent } from './forsale/forsale.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
//import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './footer/footer.component';
import { BuilderListingsComponent } from './builder-listings/builder-listings.component';
import { AboutComponent } from './about/about.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ConfirmationSentComponent } from './confirmation-sent/confirmation-sent.component';
import { TermsPolicyComponent } from './terms-policy/terms-policy.component';
import { CustomErrorComponent } from './custom-alert/custom-error/custom-error.component';
import { HomeContactComponent } from './modals/home-contact/home-contact.component';
import { ListingDetailsContactComponent } from './modals/listing-details-contact/listing-details-contact.component';
import { ForsaleOptionsComponent } from './modals/forsale-options/forsale-options.component';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ForsaleListingComponent } from './modals/forsale-listing/forsale-listing.component';
import { ToastrModule } from 'ngx-toastr';
import {MatPaginatorIntl,MatPaginatorModule} from '@angular/material/paginator';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PaginationComponent,
      HomeContactComponent,
      ListingDetailsContactComponent,
      ForsaleOptionsComponent,
      TestErrorsComponent,
      AppComponent,
      NavbarComponent,
      LoginregisterComponent,
      HomeComponent,
      ForsaleComponent,
      ListingCardComponent,
      ListingDetailComponent,
      FooterComponent,
      BuilderListingsComponent,
      AboutComponent,
      TestErrorsComponent,
      NotFoundComponent,
      ServerErrorComponent,
      LoginComponent,
      ResetPasswordComponent,
      ForgotPasswordComponent,
      EmailConfirmationComponent,
      ConfirmationSentComponent,
      TermsPolicyComponent,
      CustomErrorComponent,
      ForsaleListingComponent
     
      
   ],
   exports: [PaginationComponent],
  imports: [
    NgbPaginationModule,
   TooltipModule.forRoot(),
    NgChartsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabsModule,
    ReactiveFormsModule,
    FormsModule,
  //  PaginationModule.forRoot(),
    ModalModule.forRoot(),   
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    MatPaginatorModule,
    HttpClientJsonpModule,
    AgmSnazzyInfoWindowModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvra3-d8BHuG3kVd1QfY6Iua8hxFCwQQY',
      apiVersion: '3.31'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgbModule,
  ],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA],
  providers: [TabsetConfig,
              MatPaginatorIntl,
              BsDropdownConfig,
              {provide:HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
              {provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

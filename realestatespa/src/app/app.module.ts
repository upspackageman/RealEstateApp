import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { HomeComponent } from './home/home.component';
import { ForsaleComponent } from './forsale/forsale.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ModalModule} from 'ngx-bootstrap/modal';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './footer/footer.component';
import { BuilderListingsComponent } from './builder-listings/builder-listings.component';
import { AboutComponent } from './about/about.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import {ToastrModule} from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';





@NgModule({
  declarations: [
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
      ServerErrorComponent
      
   ],
  imports: [
    GoogleMapsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabsModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),   
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBM4RMj9NjeZABU92eGAZIA-kmgl4avboo'
    }),
    AgmSnazzyInfoWindowModule



  ],

  providers: [TabsetConfig,
              BsDropdownConfig,
              GoogleMapsAPIWrapper,
              {provide:HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
              {provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

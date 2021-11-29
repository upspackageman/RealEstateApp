import { Component, OnInit, TemplateRef } from '@angular/core';
import { Listing } from '../_models/listing';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ListingsService } from '../_services/listings.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {
  listing: Listing;


  constructor(private accountService: AccountService, private listingsService: ListingsService, private route: ActivatedRoute,private modalService: BsModalService, private  router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
   }
  direct:string;
  monthlyPayment:number;
  annualInterestRate:number = .00000001;   //r
  homeAmount:number=0;  //P
  numberOfPeriodicPaymentsPerYear:number =12; //n
  tenureOfLoansPerYear:number=30; //t
  percentDownPayment:number=.0000001;
  amtDownPayment:number=0;
  overallPayment:number = 0;
  propTax:number=0;
  hoaFee:number = 0;
  pmiButton:string='Enable PMI';
  propInsurance:number = 0;
  pmiEnambled:boolean = true;
  pmi:number =0;
  is_loaded:boolean = true;
  modalRef: BsModalRef;
  customClass = 'customClass';


  ngAfterViewInit() {
    // ...
    this.mortgageCalulator();

  }

  ngOnInit() {

    this.redirect();

    this.loadListing();


  }

  mortgageCalulator(){
    /*
    annualInterestRate:number;   //r
    homeAmount:number=2000000;  //P
    numberOfPeriodicPaymentsPerYear:number; 12 //n
    tenureOfLoansPerYear:number=5; //t
    */

   this.homeAmount = this.listing.priceSearch;
   this.hoaFee = Number(this.listing.homeOwnerFees);
   let r:number = this.annualInterestRate;
   let p:number = this.homeAmount - this.amtDownPayment;
   let n:number = this.numberOfPeriodicPaymentsPerYear;
   let t:number = this.tenureOfLoansPerYear;

   this.monthlyPayment =p*(((r/n)*((1+(r/n))**(n*t))) / (((1+(r/n))**(n*t))-1));
   this.overallPayment = this.monthlyPayment + this.propTax + this.propInsurance+ this.propInsurance + this.hoaFee + this.pmi;

  }

 loadListing(){
    this.listingsService.getListingsById(this.route.snapshot.paramMap.get('id')).subscribe(listing => {
      this.listing = listing;
    })
  }

  amountDownPayment(e:number){
    this.percentDownPayment= (e /this.listing.priceSearch)*100;
    this.amtDownPayment= e*1;
    console.log(this.percentDownPayment);
    console.log(this.amtDownPayment);
    this.mortgageCalulator();
    this.pmiEstimate();
  }

  percentageDownPayment(e:number){
    this.amtDownPayment = e*.01* this.listing.priceSearch; /* * perecnt entered*/
    this.mortgageCalulator();
    this.pmiEstimate();
   }

  loanProgram(e:number){
    this.tenureOfLoansPerYear =e;/* = Enter number*/
    this.mortgageCalulator();
  }

  interestRate(e:number){

    if(e==0){
      this.annualInterestRate =.0000001;
      this.mortgageCalulator();
      this.pmiEstimate();
    }
    else{
    this.annualInterestRate =e * .01;
    console.log(e);
    this.pmiEstimate();
    this.mortgageCalulator(); /* = Enter number*/
    }
  }

  propertyTax(e:number){
    this.propTax = (e * .01 * this.listing.priceSearch)/12; /* * percent entered */
    this.mortgageCalulator();
  }

  propertyInsurance(e:number){
    this.propInsurance=e*1;
    console.log(this.propInsurance);
    this.mortgageCalulator();
  }

  hoaFees(e:number){
    this.hoaFee =e*1; /* = Enter number*/
    this.mortgageCalulator();
  }

 pmiSwitch(){
  this.pmiEnambled=!this.pmiEnambled;
  if(this.pmiEnambled==true){
    this.pmiButton = 'Disable PMI';
  }
  else{
    this.pmiButton = 'Enable PMI';
  }
  this.pmiEstimate();
 }



  pmiEstimate(){
    if(this.pmiEnambled==false){
      this.pmi=0;
    }
    else if( (this.amtDownPayment/this.homeAmount) >= .2){
      this.pmi=0;
    }
    else{
      this.pmi = ((this.homeAmount - this.amtDownPayment) * this.annualInterestRate)/12
    }
    this.mortgageCalulator();
  }


  async redirect(){
    window.scroll(-1000000,-1000000);
    if(!localStorage.getItem('direct')){
      localStorage.setItem('direct', 'no reload')
      location.reload();

    } else {

      localStorage.removeItem('direct');

    }
  }

  async openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

}

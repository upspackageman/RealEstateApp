import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Listing } from '../_models/listing';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../_services/listings.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from '../_services/account.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmailService } from '../_services/email.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Chart, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})



export class ListingDetailComponent implements OnInit {
  listing: Listing;
  contact: any = {};
  form: UntypedFormGroup = new UntypedFormGroup({});
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$";
  contactForm: UntypedFormGroup;

  public doughnutChartLabels: string[] = ['Principal & Interest', 'Property Taxes', 'Mortage Insurance', 'Home Insurance', 'HOA'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100, 55, 78] }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor(private accountService: AccountService, private listingsService: ListingsService, private route: ActivatedRoute, private modalService: BsModalService,
    private router: Router, private fb: UntypedFormBuilder, private emailService: EmailService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    Chart.defaults.font.family = "'Oswald', sans-serif";
    this.contactForm = fb.group({
      firstName: [null, [Validators.required, Validators.minLength(1)]],
      lastName: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [null, [Validators.required, Validators.pattern(this.phonePattern)]],
      agentName: [null],
      agentPhone: [null],
      agentEmail: [null],
      message: []
    });
  }

  direct: string;
  monthlyPayment: number;
  annualInterestRate: number = .00000001;   //r
  homeAmount: number = 0;  //P
  numberOfPeriodicPaymentsPerYear: number = 12; //n
  tenureOfLoansPerYear: number = 30; //t
  percentDownPayment: number = 0;
  amtDownPayment: number = 0;
  overallPayment: number = 0;
  propTax: number = .75;
  hoaFee: number = 0;
  pmiButton: string = 'Enable PMI';
  propInsurance: number = 0;
  pmiEnambled: boolean;
  pmi: number = 0;
  setPmi = 0;
  contactAgent: boolean = false;
  isSent: boolean = false;
  is_loaded: boolean = true;
  modalRef: BsModalRef;
  showSuccess: boolean = false;
  customClass = 'customClass';
  listId = this.route.snapshot.paramMap.get('id');
  totalTax = 0;
  // options
  gradient: boolean = true;
  config = {
    backdrop: true,
    animated: true,
    class: 'gray modal-lg',
    ignoreBackdropClick: false
  };


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  ngOnInit() {
    this.loadListing();
    this.checkWidth();
    // console.log(this.doughnutChartData.datasets[0].data[1]);
    // console.log(this.doughnutChartLabels[0]);
  }

  @HostListener('window:resize', ['$event'])
  checkWidth(event?) {
    if (window.matchMedia("(max-width:500px)").matches) {
      Chart.defaults.font.size = 54;
      this.chart?.update();
    }
    else {
      Chart.defaults.font.size = 12;
      console.log(Chart.defaults.font.size);
      this.chart?.update();
    }



  }


  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  mortgageCalulator() {
    /*
    annualInterestRate:number;   //r
    homeAmount:number=2000000;  //P
    numberOfPeriodicPaymentsPerYear:number; 12 //n
    tenureOfLoansPerYear:number=5; //t
    */

    this.homeAmount = this.listing.priceSearch;
    let r: number = this.annualInterestRate;
    let p: number = this.homeAmount - this.amtDownPayment;
    let n: number = this.numberOfPeriodicPaymentsPerYear;
    let t: number = this.tenureOfLoansPerYear;
    this.totalTax = ((this.propTax * .01 * this.listing.priceSearch) / 12);


    this.monthlyPayment = p * (((r / n) * ((1 + (r / n)) ** (n * t))) / (((1 + (r / n)) ** (n * t)) - 1));
    this.pmi = (this.setPmi * (this.homeAmount - this.amtDownPayment)) / 12;
    this.overallPayment = this.monthlyPayment + this.totalTax + this.propInsurance + this.hoaFee + this.pmi;
    this.doughnutChartData.datasets[0].data[0] = this.monthlyPayment;
    this.doughnutChartData.datasets[0].data[1] = this.totalTax;
    this.doughnutChartData.datasets[0].data[2] = this.pmi;
    this.doughnutChartData.datasets[0].data[3] = this.propInsurance;
    this.doughnutChartData.datasets[0].data[4] = this.hoaFee;
    console.log(this.pmi);
    this.chart?.update();
  }

  loadListing() {
    //this.redirect();
    
    this.listingsService.getListingsById(this.route.snapshot.paramMap.get('id')).subscribe(listing => {
      this.listing = listing;
      this.mortgageCalulator();
      this.pmiSwitch();
      console.log(this.route.snapshot.paramMap.get('id'));

    })
  }

  amountDownPayment(e: number) {
    this.percentDownPayment = (e / this.listing.priceSearch) * 100;
    this.amtDownPayment = e * 1;
    console.log(this.percentDownPayment);
    console.log(this.amtDownPayment);
    this.pmiEstimate();
    this.mortgageCalulator();
  }

  percentageDownPayment(e: number) {
    this.amtDownPayment = e * .01 * this.listing.priceSearch; /* * perecnt entered*/
    this.pmiEstimate();
    this.mortgageCalulator();
  }

  loanProgram(e: number) {
    this.tenureOfLoansPerYear = e;/* = Enter number*/
    this.mortgageCalulator();
  }

  interestRate(e: number) {
    if (e == 0) {
      this.annualInterestRate = .0000001;
      this.pmiEstimate();
    }
    else {
      this.annualInterestRate = e * .01;
      console.log(e);
      this.pmiEstimate();
    }
    this.mortgageCalulator(); /* = Enter number*/
  }

  propertyTax(e: number = 5) {
    this.propTax = e; /* * percent entered */
    this.mortgageCalulator();
  }

  propertyInsurance(e: number) {
    this.propInsurance = e * 1;
    console.log(this.propInsurance);
    this.mortgageCalulator();
  }

  hoaFees(e: number) {
    this.hoaFee = e * 1; /* = Enter number*/
    console.log(this.hoaFee);
    this.mortgageCalulator();
  }
  pmiSwitch() {
    
    if (this.pmiEnambled == true) {
      this.pmiButton = 'Enable PMI';
      this.pmiEnambled = false;
      this.pmiEstimate();
    }
    else {
      this.pmiEnambled = true;
      this.pmiButton = 'Disable PMI';
      this.pmiEstimate();
      
    }
    
  }

  pmiEstimate() {
    if (this.pmiEnambled == false) {
      this.setPmi = 0;
    }
    else if ((this.amtDownPayment / this.homeAmount) >= .2) {
      this.setPmi = 0;
    }
    else {
      this.setPmi = .0022;
    }
    this.mortgageCalulator();
  }

  async redirect() {

    if (!localStorage.getItem('direct')) {

      localStorage.setItem('direct', 'no reload')

      location.reload();
    } else {
      window.scroll(-1000000, -1000000);
      localStorage.removeItem('direct');
    }
  }

  async toContactAgent(e) {
    this.contactAgent = e.target.checked;
    console.log(this.contactAgent);
  }

  async openModalWithClass(template: TemplateRef<any>) {
    this.isSent = false;
    this.modalRef = this.modalService.show(
      template, this.config);
  }

  sendMail() {
    this.contact.from = this.contactForm.value.email;
    this.contact.firstName = this.contactForm.value.firstName;
    this.contact.lastName = this.contactForm.value.lastName;
    this.contact.phone = this.contactForm.value.phone;
    this.contact.subject = 'Property Inquiry';
    this.contact.message = this.contactForm.value.message;
    this.contact.listing = this.listing.id;
    this.contact.agentName = this.contactForm.value.agentName;
    this.contact.agentEmail = this.contactForm.value.agentEmail;
    this.contact.agentPhone = this.contactForm.value.agentPhone;
    console.log(this.contact);
    console.log(this.contact.agentName);
    this.emailService.sendEmail(this.contact).subscribe({
      next: (_) => {
        //this.modalRef.hide();
        this.isSent = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });


  }

  get f() {
    return this.contactForm.controls;
  }
}

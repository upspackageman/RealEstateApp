import { AfterViewInit, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Listing } from '../_models/listing';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../_services/listings.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AccountService } from '../_services/account.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmailService } from '../_services/email.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Chart, ChartData, ChartEvent, ChartOptions, ChartType, FontSpec } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ListingDetailsContactComponent } from '../modals/listing-details-contact/listing-details-contact.component';
import { ListingParams } from '../_models/listingParams';
import { take } from 'rxjs';



@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})



export class ListingDetailComponent implements OnInit {
  listing: Listing | undefined;
  listingParams: ListingParams | undefined;
  user: User | undefined;
  contact: any = {};
  form: UntypedFormGroup = new UntypedFormGroup({});
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$";
  contactForm: UntypedFormGroup;

  public doughnutChartLabels: string[] = ['Princ & Inter', 'Prop Taxes', 'Mort Ins', 'Home Ins', 'HOA'];
  

  public doughnutChartData: ChartData<'doughnut'> = {

    labels: this.doughnutChartLabels,

    datasets: [
      {
        data: [350, 450, 100, 55, 78],
      
        backgroundColor: [
          'rgba(255, 228, 225, 0.8)',
          'rgba(196, 233, 215, 0.8)',
          'rgba(220, 220, 220, 0.8)',
          'rgba(230, 230, 250, 0.8)',
          'rgba(1255, 229, 180, 0.8)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 228, 229, 1)',
          'rgba(196, 238, 215, 1)',
          'rgba(225, 220, 220, 1)',
          'rgba(230, 235, 250, 1)',
          'rgba(1255, 229, 185, 1)',
        ]
      }
    ],
    

  };

  public doughnutChartOptions: ChartOptions = {
  
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14 // Adjust the legend font size here
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(64, 61, 7, 0.8)', // Set the desired background color here
         bodyFont: {
          letterSpacing: 0,
          size: 10 // Adjust the tooltip font size here
        }  as Partial<FontSpec>
      },
    },
    
  };

  public doughnutChartType: ChartType = 'doughnut';

  bsModalRef?: BsModalRef;

  constructor(private accountService: AccountService, private listingsService: ListingsService, private route: ActivatedRoute, private modalService: BsModalService,
    private router: Router, fb: UntypedFormBuilder, private emailService: EmailService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
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
  mort_30:any={};
  mort_15:any={};
  mort_5:any={};
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
    this.mortgageCalulator();
    this.checkWidth();
    this.showFooter();
  }

  

  showFooter(){
    const link = document.querySelector('app-footer .footer ') as HTMLElement;
    link.style.display="flex";
}

  @HostListener('window:resize', ['$event'])
  checkWidth(event?) {
    if (window.matchMedia("(max-width:500px)").matches) {
      Chart.defaults.font.size = 54;
      this.chart?.update();
    }
    else {
      Chart.defaults.font.size = 12;
      this.chart?.update();
    }
  }


  
 

  mortgageCalulator() {
    /*
    annualInterestRate:number;   //r
    homeAmount:number=2000000;  //P
    numberOfPeriodicPaymentsPerYear:number; 12 //n
    tenureOfLoansPerYear:number=5; //t
    */


    
    switch (this.tenureOfLoansPerYear) {
      case 30:
        this.mort_30={'opacity':'1'};
        this.mort_15={'opacity':'.5'};
        this.mort_5={'opacity':'.5'};
        break;
      case 15:
        this.mort_30={'opacity':'.5'};
        this.mort_15={'opacity':'1'};
        this.mort_5={'opacity':'.5'};
        break;
      case 5:
        this.mort_30={'opacity':'.5'};
        this.mort_15={'opacity':'.5'};
        this.mort_5={'opacity':'1'};
        break;

    }
    

    this.homeAmount = this.listing.priceSearch;
    let r: number = this.annualInterestRate;
    let p: number = this.homeAmount - this.amtDownPayment;
    let n: number = this.numberOfPeriodicPaymentsPerYear;
    let t: number = this.tenureOfLoansPerYear;
    this.totalTax = ((this.propTax * .01 * this.listing.priceSearch) / 12);


    this.monthlyPayment = p * (((r / n) * ((1 + (r / n)) ** (n * t))) / (((1 + (r / n)) ** (n * t)) - 1));
    this.pmi = (this.setPmi * (this.homeAmount - this.amtDownPayment)) / 12;
    this.overallPayment = this.monthlyPayment + this.totalTax + this.propInsurance + this.hoaFee + this.pmi;
    this.doughnutChartData.datasets[0].data[0] = Number(this.monthlyPayment.toFixed(2));
    this.doughnutChartData.datasets[0].data[1] = Number(this.totalTax.toFixed(2));
    this.doughnutChartData.datasets[0].data[2] = Number(this.pmi.toFixed(2));
    this.doughnutChartData.datasets[0].data[3] = Number(this.propInsurance.toFixed(2));
    this.doughnutChartData.datasets[0].data[4] = Number(this.hoaFee.toFixed(2));
    this.chart?.update();
  }

  loadListing() {

    this.redirect();
    this.listingsService.getListingsById(this.route.snapshot.paramMap.get('id')).subscribe(listing => {
    this.listing = listing;
    //  this.loanProgram(this.tenureOfLoansPerYear);
    });
  }

  

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        listId: this.listId
      }
    };
    this.bsModalRef = this.modalService.show(ListingDetailsContactComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  amountDownPayment(e: number) {
    this.percentDownPayment = (e / this.listing.priceSearch) * 100;
    this.amtDownPayment = e * 1;
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
      this.pmiEstimate();
    }
    this.mortgageCalulator(); /* = Enter number*/
  }

  propertyTax(e: number = 5) {
    this.propTax = e * 1; /* * percent entered */
    this.mortgageCalulator();
  }

  propertyInsurance(e: number) {
    this.propInsurance = e * 1;
    this.mortgageCalulator();
  }

  hoaFees(e: number) {
    this.hoaFee = e * 1; /* = Enter number*/
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

  redirect() {

    if (!localStorage.getItem('direct_detail')) {
      localStorage.setItem('direct_detail', 'not reload');
      const currentUrl = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      })
    } 
    else {
      localStorage.removeItem('direct_detail');
    }
  }

  toContactAgent(e) {
    if (e.target) {
      this.contactAgent = e.target.checked;
    }
  }

  openModalWithClass(template: TemplateRef<any>) {
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

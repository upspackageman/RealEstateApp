import {Location} from './../_models/location';
import { ListingParams } from './../_models/listingParams';
import { ListingsService } from './../_services/listings.service';
import { Component, OnInit, TemplateRef, HostListener} from '@angular/core';
import { Listing } from '../_models/listing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Pagination} from '../_models/pagination';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';




@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})



export class ForsaleComponent implements OnInit {
  ListingParams:ListingParams;
  search:string;
  modalRef: BsModalRef;
  listings: Listing[]=[];

  pagination: Pagination;
  numberOfRooms:number = -1;
  numberOfBathrooms: number = -1
  currentPrice:number = -1;
  currentZip:number = -1;
  pageNumber = 2;
  maxSize = 4;

  activeColor:string;
  contingentColor:string;
  pendingColor:string;
  soldColor:string;
  bomColor:string;
  isMapView:boolean;
  withdrawnColor:string;
  cancelledColor:string;
  expiredColor:string;
  comingColor:string;
  selected:string ='-webkit-linear-gradient(top left, rgb(87, 185, 255), rgb(107, 107, 245))';
  unselected:string ='-webkit-linear-gradient(top left, rgb(255, 222, 218), rgb(255, 69, 69))';
  totalCount:number;
  monthlyPayment:number;
  annualInterestRate:number = .08;   //r
  homeAmount:number=2000000;  //P
  numberOfPeriodicPaymentsPerYear:number =12; //n
  tenureOfLoansPerYear:number=5; //t
  zIndex:string;

  priceSelect = [
    50000,
    10000,
    20000,
    30000,
    40000,
    50000,
    75000,
    100000,
    125000,
    150000,
    175000,
    200000,
    250000,
    300000,
    350000,
    400000,
    450000,
    500000,
    550000,
    600000,
    650000,
    700000,
    750000,
    800000,
    850000,
    900000,
    950000,
    1000000,
    1250000,
    1500000,
    2000000,
    2500000,
    3000000,
    5000000,
    10000000
  ];

  config = {
    backdrop: true,
    animated: true,
    ignoreBackdropClick: false
  };




  public location:Location = {
    lat: 51.678410,
    lng: 7.809007,
    iconUrl: '/assets/icons/circle_2.png',
    zoom:11.5,
    draggable: true,
    disableDefaultUI: true,
    padding: '0px',
    border:true,
    borderRadius:'0px',
    isOpen:true,
    showDefaultInfoWindow: false,
    label:{
      color:'green',
      fontSize:'3rem',
      text:'this.listings'
    },
    styles:[
      {
        featureType: "poi",
        stylers:[
          {visibility: "off"}
        ]
      }
    ],
    clickableIcons:false
  }

  constructor(public accountService: AccountService, private listingService: ListingsService, private modalService: BsModalService,  private router: Router) {
    this.ListingParams = new ListingParams();

   }

  ngOnInit() {
    this.loadListings();
    this.setColors();
    this.checkWidth();
    this.setMapViewOptions();


  }

  @HostListener('window:resize', ['$event'])
    checkWidth(event?){
      if(window.matchMedia("(min-width:500px)").matches)
          this.location.iconUrl = '/assets/icons/circle_4.png';
      else
        this.location.iconUrl = '/assets/icons/circle_2.png';
    }

  public async loadListings(sort=1) {
    this.listingService.getListings(this.ListingParams).subscribe(response=>{
      
      this.listings = response.result;

    //  for(let list of this.listings){
    //   (this.mapService.getAddressMarkerById(list.fullAddress)).subscribe(data =>{

    //     list.latitude = data.result.addressMatches[0].coordinates.x;
    //     list.longitude = data.result.addressMatches[0].coordinates.y;
    //     lat = list.latitude;
    //     lng = list.longitude;
    //     this.location.lat = lat;
    //     this.location.lng = lng;
    //   })

    //   console.log('Lat: ' + lat + 'long: '+lng );
    // }

      this.pagination = response.pagination;
      this.totalCount = response.pagination.totalPages * response.pagination.totalItems;
   })
  }

  async setColors(){
    this.activeColor = this.selected;
    this.contingentColor = this.selected;
    this.pendingColor = this.selected;
    this.soldColor = this.selected;
    this.bomColor = this.selected;
    this.withdrawnColor = this.selected;
    this.cancelledColor = this.selected;
    this.expiredColor = this.selected;
    this.comingColor = this.selected;
  }

  async openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  async setMapViewOptions(){
    this.zIndex = '1';
    this.isMapView=false;
  }

  async mapView(){
    if(this.isMapView==false){
      this.zIndex = '0';
      this.isMapView=true;

    }
    else if(this.isMapView==true){
      this.zIndex = '1';
      this.isMapView=false;

    }
  }

  async searchListing(e='92054'){
    this.ListingParams.fulladdress = e;
    console.log(this.ListingParams.fulladdress);
    this.loadListings();

  }

  async pageChanged(event: any){
    this.ListingParams.pageNumber = event.page;
    window.scroll(0,0);
    this.loadListings();

  }

  async pricechange(e){
    this.ListingParams.price=e;
    this. currentPrice = e;
    this.loadListings();
    console.log(this.ListingParams.price);
  }

  async priceSort(e){
    this.ListingParams.priceSort = e;
    this.loadListings();
    console.log(this.ListingParams.priceSort);

  }

  async bedchange(e){
    this.ListingParams.bedrooms=e;
    this.numberOfRooms = this.ListingParams.bedrooms;
    this.loadListings();
    console.log(this.numberOfRooms);
  }

  async bathchange(e){
    this.ListingParams.bathtotals=e;
    this.numberOfBathrooms = this.ListingParams.bathtotals;
    this.loadListings();
    console.log(this.numberOfBathrooms);
  }

  async activeStatus(){
    if(this.ListingParams.activeStatus==''){
      this.ListingParams.activeStatus='ACTIVE';
      this.activeColor = this.selected;
      console.log(this.ListingParams.activeStatus);
      this.loadListings();
    }

    else if(this.ListingParams.activeStatus=='ACTIVE'){
      this.ListingParams.activeStatus='';
      this.activeColor = this.unselected;
      console.log(this.ListingParams.activeStatus);
      this.loadListings();
    }
  }

  async contingentStatus(){
    if(this.ListingParams.contingentStatus==''){
      this.ListingParams.contingentStatus='CONTINGENT';
      this.contingentColor = this.selected;
      this.loadListings();
    }

    else if(this.ListingParams.contingentStatus=='CONTINGENT'){
      this.ListingParams.contingentStatus='';
      this.contingentColor = this.unselected;
      this.loadListings();
    }
  }

  async pendingStatus(){
    if(this.ListingParams.pendingStatus==''){
      this.ListingParams.pendingStatus='PENDING';
      this.pendingColor = this.selected;
      this.loadListings();
    }

    else if(this.ListingParams.pendingStatus=='PENDING'){
      this.ListingParams.pendingStatus='';
      this.pendingColor = this.unselected;
      this.loadListings();
    }
  }

  async soldStatus(){
    if(this.ListingParams.soldStatus==''){
      this.ListingParams.soldStatus='SOLD';
      this.soldColor = this.selected;
      this.loadListings();
    }

    else if(this.ListingParams.soldStatus=='SOLD'){
      this.ListingParams.soldStatus='';
      this.soldColor = this.unselected;
      this.loadListings();
    }
  }

  async bomStatus(){
    if(this.ListingParams.bomStatus==''){
      this.ListingParams.bomStatus='BACK ON MARKET';
      this.bomColor = this.selected;
      this.loadListings();
    }

    else if(this.ListingParams.bomStatus=='BACK ON MARKET'){
      this.ListingParams.bomStatus='';
      this.bomColor = this.unselected;
      this.loadListings();
    }
  }

  async withdrawnStatus(){
    if(this.ListingParams.withdrawnStatus==''){
      this.ListingParams.withdrawnStatus='WITHDRAWN';
      this.withdrawnColor = this.selected;
      this.loadListings();
    }

    else if(this.ListingParams.withdrawnStatus=='WITHDRAWN'){
      this.ListingParams.withdrawnStatus='';
      this.withdrawnColor = this.unselected;
      this.loadListings();
    }
  }

  async cancelledStatus(){
    if(this.ListingParams.cancelledStatus==''){
      this.ListingParams.cancelledStatus='CANCELLED';
      this.cancelledColor = this.selected;
      this.loadListings();

    }

    else if(this.ListingParams.cancelledStatus=='CANCELLED'){
      this.ListingParams.cancelledStatus='';
      this.cancelledColor = this.unselected;
      this.loadListings();
    }
  }

 async expiredStatus(){
    if(this.ListingParams.expiredStatus==''){
      this.ListingParams.expiredStatus = 'EXPIRED';
      this.expiredColor = this.selected;
      this.loadListings();
    }

    else if(this.ListingParams.cancelledStatus=='EXPIRED'){
      this.ListingParams.cancelledStatus='';
      this.expiredColor = this.unselected;
      this.loadListings();
    }
  }

  async comingsoonStatus(){
    if(this.ListingParams.comingsoonStatus==''){
      this.ListingParams.comingsoonStatus='ACTIVE';
      this.comingColor = this.selected;
      this.loadListings();

    }

    else if(this.ListingParams.comingsoonStatus=='ACTIVE'){
      this.ListingParams.comingsoonStatus='';
      this.comingColor = this.unselected;
      this.loadListings();
    }
  }

  async estimatedSqFt(e){
    this.ListingParams.estSqrFt = e;
    this.loadListings();
    }


  async lotSize(e){
    this.ListingParams.lotSize = e;
    this.loadListings();
  }

  async redirect(id:string){
    this.router.navigate(['/listing/'+id]);
  }




}

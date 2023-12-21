import { Location } from './../_models/location';
import { ListingParams } from './../_models/listingParams';
import { ListingsService } from './../_services/listings.service';
import { Component, OnInit, TemplateRef, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Listing } from '../_models/listing';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Pagination } from '../_models/pagination';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClusterIconStyle } from '@google/markerclustererplus';
import { ForsaleListingComponent } from '../modals/forsale-listing/forsale-listing.component';
import { Marker } from '../_models/marker';
import { MarkerParams } from '../_models/markerParams';
import { AgmMap, LatLngBounds } from '@agm/core';
import { HttpClient } from '@angular/common/http';








@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.css', './../footer/footer.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
  

})



export class ForsaleComponent implements OnInit {
  
  currentPage:number = 1;
  totalPages=1;
  @ViewChild('map') map: AgmMap;
  listingParams: ListingParams | undefined;
  markerParams: MarkerParams;
  search: string;
  totalItems: number;
  itemsPerPage: number=0;
  isSearch: boolean = false;
  newBounds?: LatLngBounds | undefined;
  modalRef: BsModalRef;
  listings: Listing[] = [];
  listing: Listing | undefined;
  markers: Marker[] = [];
  pagination: Pagination | undefined;
  numberOfRooms: number = -1;
  numberOfBathrooms: number = -1
  currentPrice: number = -1;
  currentBath: number = -1;
  currentBed: number = -1;
  currentSqft: string = "-1";
  currentSort: string = "-1";
  pageNumber = 1;
  maxSize = 10;
  totalCount: number;
  sortOrder: string = '--Sort--';
  selectedEst = -1;
  init: number = 0;
  activeSelected: boolean = true;
  contingentSelected: boolean = true;
  soldSelected: boolean = true;
  bomSelected: boolean = true;
  pendingSelected: boolean = true;
  withdrawnSelected: boolean = true;
  cancelledSelected: boolean = true;
  expiredSelected: boolean = true;
  comingsoonSelected: boolean = true;
  forecloseSelected: boolean = true;
  activeColor: string;
  bomStatusactiveColor: string;
  contingentColor: string;
  pendingColor: string;
  soldColor: string;
  bomColor: string;
  isMapView: boolean = true;
  withdrawnColor: string;
  cancelledColor: string;
  expiredColor: string;
  comingColor: string;
  selected: string = '-webkit-linear-gradient(top left, rgb(87, 185, 255), rgb(107, 107, 245))';
  unselected: string = '-webkit-linear-gradient(top left, rgb(255, 222, 218), rgb(255, 69, 69))';
  monthlyPayment: number;
  annualInterestRate: number = .08;   //r
  homeAmount: number = 2000000;  //P
  numberOfPeriodicPaymentsPerYear: number = 12; //n
  tenureOfLoansPerYear: number = 5; //t
  zIndex: string;
  mapDisplay: string;
  listDisplay: string = 'flex';
  borderTop: string;
  _display: string = 'none';
  //zPagination: string='5';
  searchBar: UntypedFormGroup;
  pricesortHTML: string = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
  whitepaceCheck: string = "/\A\s*\z/";
  mapIndex = 0;
  zMap = 3;
  mobileFontSize: string;
  isDisabled: boolean = true;
  clearSearchBtnDisplay: string = 'none';
  clearSearchBtnZindex: number = 0;
  searchValue: string = '';
  markerClusterIconStyles: ClusterIconStyle[] = [
    {
      url: '/assets/marker1.png',
      height: 40,
      width: 40,
      textSize: 16,
      textColor: 'black'
    }
  ];





  sqftSelect = [
    "0",
    "500",
    "1000",
    "1500",
    "2000",
    "2500",
    "3000",
    "3500",
    "4000",
    "4500",
    "5000",
    "6000",
    "6500",
    "7000",
    "10000",
    "20000",
    "30000"
  ];

  bedSelect = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ];


  bathSelect = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
  ];

  priceSelect = [
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

  mapCard = {
    maxWidth: 1350,
    maxHeight: 3000
  }






  public location: Location = {
    lat: 33.10716938018116,
    lng: -117.17115519242,
    iconUrl: '/assets/icons/circle_2.png',
    zoom: 10.5,
    scrollZoom: false,
    draggable: false,
    panControl: false,
    disableDefaultUI: true,
    padding: '0px',
    border: true,
    borderRadius: '25px',
    agmFitBounds: true,
    isOpen: true,
    showDefaultInfoWindow: false,
    label: {
      color: 'green',
      fontSize: '3rem',
      text: 'this.listings'
    },
    imageSize: [153, 156, 166, 178, 190],
    styles: [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      }
    ],
    clickableIcons: false,
    gestureHandling: 'greedy',


  }
  bsModalRef?: BsModalRef;
  constructor( private listingsService: ListingsService, private fb: UntypedFormBuilder, private modalService: BsModalService, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.searchBar = fb.group({ search: [null, [Validators.required, Validators.pattern(/\w/)]] });
    this.listingParams = this.listingsService.getListingParams();    
  }


  ngOnInit() {
    this.currentPage = this.listingParams.pageNumber;
    this.mapView();
    console.log(this.itemsPerPage);
   
    this.loadListings();
    this.setColors();
    this.checkWidth();
  }

  setUpdateListings(newBounds?: LatLngBounds) {
    if (this.isSearch == true) {
      this.updateListings(newBounds);
    }
    if (this.isSearch == false) {
      this.listingParams.fulladdress = 'CA';
      this.updateListings(newBounds);
    }
  }

  @HostListener('window:resize', ['$event'])
  checkWidth(event?) {
    if ((window.matchMedia('(max-width:500px)').matches)) {
      this.markerClusterIconStyles[0].url = '/assets/marker2.png',
        this.markerClusterIconStyles[0].width = 100,
        this.markerClusterIconStyles[0].height = 100,
        this.markerClusterIconStyles[0].textSize = 50
        this.mapCard.maxWidth = 1750,
        this.mapCard.maxHeight = 1650,
        this.location.zoom = 12;
    }

    if ((window.matchMedia('(max-width:330px)').matches)) {
        this.mapCard.maxWidth = 1750,
        this.mapCard.maxHeight = 1750,
        this.location.zoom = 12;
    }

    
  }


  @HostListener('window:resize', ['$event'])
  public async loadListings(newBounds?: LatLngBounds) {
    this.redirect_listing();
    this.checkListingStatus();
      if(this.listingParams){
       
          this.listingsService.getListings(this.listingParams).subscribe(response => {
          this.listings = response.result;
          this.pagination = response.pagination;
          this.totalItems = this.pagination.totalItems;
          this.itemsPerPage = this.pagination.itemsPerPage;
          this.totalPages = response.pagination.totalPages;
    
          for (let list of this.listings) {
           // console.log(list);
            if (window.matchMedia('(min-width:450px)').matches) {
              list.iconUrl = '/assets/circle_4.png';
    
            }
            else {
              list.iconUrl = '/assets/circle_2.png';
            }
    
          }
          this.pagination.itemsPerPage = response.pagination.itemsPerPage;
          this.pagination.totalItems = response.pagination.totalItems;
        })

        this.updateListings(newBounds);
      }

      
  }

  @HostListener('window:resize', ['$event'])
  public async updateListings(newBounds?: LatLngBounds) {

    this.listingsService.setListingParams(this.listingParams);
    const bounds = this.map;
   
    this.listingsService.getListings(this.listingParams).subscribe(response => {


      var _listings = response.result;
      this.pagination = response.pagination;
      this.totalItems = this.pagination.totalItems;
      this.itemsPerPage = this.pagination.itemsPerPage;
      if(newBounds!==undefined){
        this.listings = _listings.filter((_listing) => newBounds.contains(_listing));
      }

      for (let list of _listings) {
        if (window.matchMedia('(min-width:450px)').matches) {
          list.iconUrl = '/assets/circle_4.png';

        }
        else {
          list.iconUrl = '/assets/circle_2.png';

        }
      }
   

      if (window.matchMedia('(max-width:450px)').matches && this.init == 0) {
        this.init = 1;
        this.mapDisplay = 'flex';
        this.borderTop = 'none';
      }
    })
  }

  async setColors() {
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
    this.checkListingStatus();
    console.log(this.activeSelected);
    this.modalRef = this.modalService.show(template, this.config);
    console.log(this.activeSelected);
  }


  openModalWithComponent(id, pic, _price, beds, bathsfull, bathhalf, sqft, address) {
    const initialState: ModalOptions = {
      initialState: {
        id: id,
        listingPictures: pic,
        bathFull: bathsfull,
        bathsHalf: bathhalf,
        bedroom: beds,
        estimatedSquareFeet: sqft,
        fullAddress: address,
        price: _price
      }
    };
    this.bsModalRef = this.modalService.show(ForsaleListingComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  async redirect_listing() {
    if (!localStorage.getItem('_direct')) {
      localStorage.setItem('_direct', 'no reload');
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      
    });
    } else {
      localStorage.removeItem('_direct');

    }
  }

 async toTop(){
  const left = document.getElementsByClassName('left');
     await  left[0].scroll(0, 0);
 }

  async mapViewTablet() {
    if (this.isMapView == false) {
      this.zIndex = '5';
      this.isMapView = true;
      this.zMap = 5;
      //this.zPagination = '5';
    }
    else {
      this.zMap = 3;
      this.zIndex = '0';
      this.isMapView = false;
     // this.zPagination = '0';
    }
  }

  @HostListener('window:resize', ['$event'])
  async searchMobile(): Promise<void> {
    if (window.matchMedia('(max-width:450px)').matches) {
      this.isMapView = true;
      console.log(this.isMapView);
      this.mapView();
    }
  }

  @HostListener('window:resize', ['$event'])
  async mapView() {
   // this.location.zoom = 12;
    if (this.isMapView == false) {
      this.zIndex = '2';
      this.mapDisplay = 'inline-flex';
     // this.listDisplay = 'none';
      this.clearSearchBtnZindex = 3;
      this.isMapView = true;
      this.zMap = 5;
      //this.zPagination = '5';

    }
    else {
      this.zMap = 3;
      this.zIndex = '1';
      this.listDisplay = 'flex';
     // this.mapDisplay = 'none';
      this.clearSearchBtnZindex = 0;
      this.isMapView = false;
      //this.zPagination = '5';
      console.log(this.isMapView);

    }

    return;
  }

  async zoomChange(e: any) {
    console.log('SCROLL');
  }



  async searchListing(e: string = 'CA') {
    this.listingParams.fulladdress = e;
    this.isSearch = true;
    this.clearSearchBtnDisplay = 'inline';
    this.clearSearchBtnZindex = 0;
    this.listingParams.pageNumber=1;
    this.currentPage = this.listingParams.pageNumber;
    this.loadListings();
  }

  async clearSearch() {
    const search = document.getElementById("searchList") as HTMLInputElement;
    search.value = '';
    this.listingParams.priceSort = -1;
    this.listingParams.estSqrFt = -1;
    this.listingParams.fulladdress = " CA"; 
    this.listingParams. zipcode = -1;
    this.listingParams.bathtotals = -1;
    this.listingParams.bedrooms = -1;
    this.listingParams.price = -1;
    this.listingParams.pageNumber=1;
    this.listingParams.activeStatus ="ACTIVE";
    this.listingParams.contingentStatus ="CONTINGENT";
    this.listingParams.pendingStatus ="PENDING";
    this.listingParams.soldStatus ="SOLD";
    this.listingParams.bomStatus ="BACK ON MARKET";
    this.listingParams.withdrawnStatus ="WITHDRAWN";
    this.listingParams.expiredStatus ="FORECLOSED";
    this.listingParams.comingsoonStatus ="COMING SOON";
    this.listingParams.cancelledStatus ="CANCELLED";
    this.currentPage = this.listingParams.pageNumber;
    this.clearSearchBtnDisplay = 'none';   
    await  this.toTop();
    this.loadListings();
  }

  async pageChanged(page: number,newBounds?:LatLngBounds) {
    const left = document.getElementsByClassName('left');
     await  this.toTop();
      this.listingParams.pageNumber = page;
      this.currentPage = this.listingParams.pageNumber;
      this.listingsService.setListingParams(this.listingParams);
     await  this.loadListings(newBounds);
   
    
  }

  async pricechange(e) {
   
    this.listingParams.price = e;
    this.listingParams.pageNumber=1;
    this.currentPrice = e;
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings();
    console.log(this.listingParams.price);
  }

  async priceSort_init(e:number ){
    this.listingParams.priceSort = e;
    if (this.listingParams.priceSort == -1) {
      this.pricesortHTML = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
      this.currentSort = 'Price Sort';
    }
    else if (this.listingParams.priceSort == 1) {
      this.pricesortHTML = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
      this.currentSort = '(High to Low)';
    }
    else {
      this.pricesortHTML = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
      this.currentSort = '(Low to High)';
    }
    
  }

  async priceSort(e) {
    this.listingParams.priceSort = e;
    if (this.listingParams.priceSort == -1) {
      this.pricesortHTML = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
      this.currentSort = 'Price Sort';
    }
    else if (this.listingParams.priceSort == 1) {
      this.pricesortHTML = '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
      this.currentSort = '(High to Low)';
    }
    else {
      this.pricesortHTML = '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
      this.currentSort = '(Low to High)';
    }
    this.listingParams.pageNumber=1;
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings();
  }




  async bedchange(e: number) {
    this.listingParams.bedrooms = e;
    this.currentBed = e;
    this.listingParams.pageNumber=1;
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings();
  }

  async bathchange(e: number) {
    this.listingParams.bathtotals = e;
    this.currentBath = e;
    this.listingParams.pageNumber=1;
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings();
  }

  @HostListener('window:resize', ['$event'])
  async listingNotHovered(e) {
    if ((e.target.getAttribute("id")) !== null) {
      for (let i = 0; i < this.listings.length; i++) {
        if (this.listings[i].id === e.target.id) {
          if (window.matchMedia('(min-width:500px)').matches) {
            this.listings[i].iconUrl = '/assets/circle_4.png';
          }
          else {
            this.listings[i].iconUrl = '/assets/circle_2.png';
          }
        }

      }
    }
  }

  @HostListener('window:resize', ['$event'])
  async listingHovered(e) {
    if ((e.target.getAttribute("id")) !== null) {
      for (let i = 0; i < this.listings.length; i++) {
        if (this.listings[i].id === e.target.id) {
          if (window.matchMedia('(min-width:500px)').matches) {
            this.listings[i].iconUrl = '/assets/circle_4_hovered.png';
          }
          else {
            this.listings[i].iconUrl = '/assets/circle_2_hovered.png';
          }
        }
      }
    }
  }

  async activeStatus(e?: Event,newBounds?: LatLngBounds) {
      if(this.listingParams.activeStatus === ''){
        this.listingParams.activeStatus = 'ACTIVE';
      }
      else if( this.listingParams.activeStatus === 'ACTIVE'){
        this.listingParams.activeStatus = '';
      }
      this.clearSearchBtnDisplay = 'inline';
      await  this.toTop();
      this.loadListings(newBounds);
  }
  
  async checkListingStatus(){
    if(this.listingParams.activeStatus ===''){
      console.log(this.activeSelected);
      this.clearSearchBtnDisplay = 'inline';
      this.activeSelected= false;
    }else{
      console.log(this.activeSelected);
      this.activeSelected= true;
    }

    if(this.listingParams.contingentStatus ===''){
      this.clearSearchBtnDisplay = 'inline';
      this.contingentSelected= false;
    }else{
      this.contingentSelected= true;
    }

    if(this.listingParams.bomStatus ===''){
      this.clearSearchBtnDisplay = 'inline';
      this.bomSelected= false;
    }else{
      this.bomSelected= true;
    }

    if(this.listingParams.pendingStatus ===''){
      this.clearSearchBtnDisplay = 'inline';
      this.pendingSelected= false;
    }else{
      this.pendingSelected= true;
    }

    if(this.listingParams.soldStatus ===''){
      this.clearSearchBtnDisplay = 'inline';
      this.soldSelected= false;
    }else{
      this.soldSelected= true;
    }

    if(this.listingParams.expiredStatus ===''){
      this.clearSearchBtnDisplay = 'inline';
      this.forecloseSelected= false;
    }else{
      this.forecloseSelected= true;
    }

    
    this.currentBath = this.listingParams.bathtotals;
    this.currentBed = this.listingParams.bedrooms;
    this.currentPrice = this.listingParams.price;
    this.estimatedSqFt_init(this.listingParams.estSqrFt);
    this.priceSort_init(this.listingParams.priceSort);

    if(this.currentBath !=-1){
      this.clearSearchBtnDisplay = 'inline';
    }
    if(this.currentBed !=-1){
      this.clearSearchBtnDisplay = 'inline';
    }
    if(this.currentPrice !=-1){
      this.clearSearchBtnDisplay = 'inline';
    }
    if(this.listingParams.estSqrFt !=-1){
      this.clearSearchBtnDisplay = 'inline';
    }
    if(this.currentBath !=-1){
      this.clearSearchBtnDisplay = 'inline';
    }
    if(this.listingParams.priceSort !=-1){
      this.clearSearchBtnDisplay = 'inline';
    }
  }

  async contingentStatus(e?: Event,newBounds?: LatLngBounds) {
    if(this.listingParams.contingentStatus === ''){
      this.listingParams.contingentStatus = 'CONTINGENT';
    }
    else if( this.listingParams.contingentStatus === 'CONTINGENT'){
      this.listingParams.contingentStatus = '';
    }
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings(newBounds);
    
  }

  async pendingStatus (e?: Event,newBounds?: LatLngBounds) {
    if(this.listingParams.pendingStatus === ''){
      this.listingParams.pendingStatus = 'PENDING';
    }
    else if( this.listingParams.pendingStatus === 'PENDING'){
      this.listingParams.pendingStatus = '';
    }
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings(newBounds);
  }

  async soldStatus(e?: Event,newBounds?: LatLngBounds) {
    if(this.listingParams.soldStatus === ''){
      this.listingParams.soldStatus = 'SOLD';
    }
    else if( this.listingParams.soldStatus === 'SOLD'){
      this.listingParams.soldStatus = '';
    }
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings(newBounds);
  }

  async bomStatus(e?: Event,newBounds?: LatLngBounds) {
    if(this.listingParams.bomStatus === ''){
      this.listingParams.bomStatus = 'BACK ON MARKET'
    }
    else if( this.listingParams.bomStatus === 'BACK ON MARKET'){
      this.listingParams.bomStatus = '';
    }
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings(newBounds);
  }

  async withdrawnStatus(e?: Event,newBounds?: LatLngBounds) {
    if(this.listingParams.withdrawnStatus === ''){
      this.listingParams.withdrawnStatus = 'WITHDRAWN';
    }
    else if( this.listingParams.withdrawnStatus === 'WITHDRAWN'){
      this.listingParams.withdrawnStatus = '';
    }
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings(newBounds);
  }

  async cancelledStatus(e?: Event,newBounds?: LatLngBounds) {
    if(this.listingParams.cancelledStatus === ''){
      this.listingParams.cancelledStatus = 'CANCELLED';
    }
    else if( this.listingParams.cancelledStatus === 'CANCELLED'){
      this.listingParams.cancelledStatus = '';
    }
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings(newBounds);
  }
 

  async forecloseStatus (e?: Event,newBounds?: LatLngBounds) {
    if(this.listingParams.expiredStatus=== ''){
      this.listingParams.expiredStatus = 'FORECLOSED';
    }
    else if( this.listingParams.expiredStatus === 'FORECLOSED'){
      this.listingParams.expiredStatus = '';
    }
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings(newBounds);
  }
  async estimatedSqFt_init(e:any) {
    this.currentSqft = e;
    this.listingParams.estSqrFt = e;
  }

  async estimatedSqFt(e:any) {
    this.currentSqft = e;
    this.listingParams.estSqrFt = e;
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings();
  }


  async lotSize(e) {
    this.listingParams.lotSize = e;
    this.clearSearchBtnDisplay = 'inline';
    await  this.toTop();
    this.loadListings();
  }

  async redirect(id: string) {
    this.router.navigate(['/listing/' + id]);
  }




}

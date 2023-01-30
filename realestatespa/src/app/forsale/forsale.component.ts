import {Location} from './../_models/location';
import { ListingParams } from './../_models/listingParams';
import { ListingsService } from './../_services/listings.service';
import { Component, OnInit, TemplateRef, HostListener,  Renderer2, RendererFactory2, ViewChild} from '@angular/core';
import { Listing } from '../_models/listing';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import {Pagination} from '../_models/pagination';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClusterIconStyle } from '@google/markerclustererplus';
import { ForsaleListingComponent } from '../modals/forsale-listing/forsale-listing.component';
import { Marker } from '../_models/marker';
import { MarkerParams } from '../_models/markerParams';
import { AgmMap, LatLngBounds} from '@agm/core';
import { HttpClient } from '@angular/common/http';






@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.css','./../footer/footer.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})



export class ForsaleComponent implements OnInit {
  @ViewChild('map') map: AgmMap;
  listingParams:ListingParams;
  markerParams:MarkerParams;
  search:string;
  isSearch:boolean=false;
  modalRef: BsModalRef;
  listings: Listing[]=[];
  markers: Marker[]=[];
  pagination: Pagination;
  numberOfRooms:number = -1;
  numberOfBathrooms: number = -1
  currentPrice:number = -1;
  currentBath:number = -1;
  currentBed:number = -1;
  currentSqft:string = "-1";
  currentSort:string="-1";
  pageNumber = 2;
  maxSize = 4;
  sortOrder:string = '--Sort--';
  selectedEst = -1;
  init:number = 0;
  activeSelected:boolean = true; 
  contingentSelected:boolean = true;
  soldSelected:boolean = true;
  bomSelected:boolean = true;
  pendingSelected:boolean = true;
  withdrawnSelected:boolean = true;
  cancelledSelected:boolean = true;
  expiredSelected:boolean = true;
  comingsoonSelected:boolean = true;
  forecloseSelected:boolean = true;
  activeColor:string;
  bomStatusactiveColor:string;
  contingentColor:string;
  pendingColor:string;
  soldColor:string;
  bomColor:string;
  isMapView:boolean = false;
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
  mapDisplay:string;
  borderTop:string;
  _display:string='none';
  zPagination:string;
  searchBar:UntypedFormGroup;
  pricesortHTML:string='<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
  whitepaceCheck:string = "/\A\s*\z/";
  mapIndex = 0;
  zMap = 3;
  mobileFontSize:string;
  isDisabled:boolean = true;
  markerClusterIconStyles: ClusterIconStyle[]  = [
    {
      url:'/assets/marker1.png',
      height: 40,
      width: 40,
      textSize:16,
      textColor:'black'
      
    }
]

  
  

  sqftSelect =[
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


  bathSelect =[
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

  mapCard ={
    maxWidth:1350,
    maxHeight:3000
  }

  




  public location:Location = {
    lat: 33.10716938018116,
    lng: -117.17115519242,
    iconUrl: '/assets/icons/circle_2.png',
    zoom:10.5,
    scrollZoom:false,
    draggable: false,
    panControl:false,
    disableDefaultUI: true,
    padding: '0px',
    border:true,
    borderRadius:'25px',
    agmFitBounds:true, 
    isOpen:true,
    showDefaultInfoWindow: false,
    label:{
      color:'green',
      fontSize:'3rem',
      text:'this.listings'
    },
    imageSize:[153, 156, 166, 178, 190],
    styles:[
      {
        featureType: "poi",
        stylers:[
          {visibility: "off"}
        ]
      }
    ],
    clickableIcons:false,
    gestureHandling:'greedy',
   
    
  }
  bsModalRef?: BsModalRef;
  constructor(public accountService: AccountService, private listingService: ListingsService, private fb: UntypedFormBuilder, private modalService: BsModalService,  private router: Router, private http: HttpClient) {
    this.listingParams = new ListingParams();
    this.searchBar =  fb.group({ search:[null,[Validators.required,Validators.pattern(/\w/)]] });

   }


  ngOnInit() {
    //this.listingParams.fulladdress ='92008 CA';
    this.redirect_listing();
    console.log(this.isMapView);
    this.loadListings();
    //this.getLocationCoord('92008 CA');

    this.setColors();
    this.checkWidth();

    


  }

  setUpdateListings(newBounds?: LatLngBounds){
    if(this.isSearch==true){
      console.log(this.listingParams.fulladdress);
      console.log(this.isSearch);
      this.updateListings(newBounds);
    }
    if(this.isSearch==false){
      this.listingParams.fulladdress = 'CA';
      console.log(this.listingParams.fulladdress);
      console.log(this.isSearch);
      this.updateListings(newBounds);

    }
  }

  @HostListener('window:resize', ['$event'])
    checkWidth(event?){
      if((window.matchMedia('(max-width:500px)').matches)){
        this.markerClusterIconStyles[0].url ='/assets/marker2.png',
        this.markerClusterIconStyles[0].width = 100,
        this.markerClusterIconStyles[0].height = 100,
        this.markerClusterIconStyles[0].textSize = 50
        this.mapCard.maxWidth = 1750,
        this.mapCard.maxHeight = 1950,
        this.location.zoom = 13; 

      }
      else{
        this.mapCard.maxHeight =290;
      }
    }

    
  @HostListener('window:resize', ['$event'])
  public async loadListings(lat?, lng?) {
   // const bounds = this.map.fitBounds;
    //console.log(newBounds);
    // this.listingService.getMarkers(this.markerParams).subscribe(response=>{
    //   this.markers = response.result;
    //   console.log(this.markers);
    // });

   
   
    console.log(this.listingParams.fulladdress);

    this.listingService.getListings(this.listingParams).subscribe(response=>{
      this.listings = response.result;
      // console.log(_listings);
      // console.log(newBounds);
      // if(newBounds!=undefined){
      //   this.listings = _listings.filter((_listing) => newBounds.contains(_listing));
      //   console.log(this.listings);
      // }
      var url = 'https://geocode.maps.co/search?q=';
      console.log(this.listings[0].state);
      console.log(url+this.listings[0].state+' '+this.listings[0].zip);
      this.http.get<any>(url+this.listings[0].state+' '+this.listings[0].zip).subscribe(data => {
         this.location.lat = data[0].lat;
         console.log(data[0].lat);
         this.location.lng = data[0].lon;
       // this.loadListings(data[0].lat,data[0].lon);
        console.log(data[0].boundingbox);
      })
      
      //this.markers += response.result;
      // this.location.lat = lat;
      // this.location.lng = lng;
      
      
    
     for(let list of this.listings){
      console.log(list);
      if(window.matchMedia('(min-width:450px)').matches){
        list.iconUrl =  '/assets/circle_4.png';
        
      }
      else{
        list.iconUrl = '/assets/circle_2.png';
        
      }
      
      
      console.log('Lat: ' + this.location.lat +  ' long: '+this.location.lng );
    }
    // for(let list of this.listings){
     
    //   if(!this.markers.includes(list)){
    //     this.markers.push(list);
    //   }
    // }

    // this.markers = [...new Set(this.markers)];
    //this.markers = this.listings;

      this.pagination = response.pagination;
      this.totalCount = response.pagination.totalPages * response.pagination.totalItems;
      
   })
  }

  @HostListener('window:resize', ['$event'])
  public async updateListings(newBounds?: LatLngBounds) {
   

   

   
   
    console.log(newBounds);
    const bounds = this.map;
    console.log(bounds);
    this.listingService.getListings(this.listingParams).subscribe(response=>{
      
      
      var _listings = response.result;
      console.log(_listings);
      this.listings = _listings.filter((_listing) => newBounds.contains(_listing));
      
      
      console.log('Lat: ' + this.location.lat +  ' long: '+this.location.lng );
      console.log(this.listings);
      for(let list of _listings){
        if(window.matchMedia('(min-width:450px)').matches){
          list.iconUrl =  '/assets/circle_4.png';
          
        }
        else{
          list.iconUrl = '/assets/circle_2.png';
          
        }
      }
      //this.markers = this.listings;

      // for(let list of this.listings){
  
      //   if(this.markers.includes(list)){
      //     this.markers.push(list);
      //   }
      // }
      
      // this.markers = [...new Set(this.markers)];
      console.log(this.listings);
      console.log(this.listingParams.fulladdress);
      this.pagination = response.pagination;
      this.totalCount = response.pagination.totalPages * response.pagination.totalItems;
      if(window.matchMedia('(max-width:450px)').matches && this.init == 0){
        this.init = 1;
        this.mapDisplay ='none';
        this.borderTop = 'none';
      }
   })
  }

  getLocationCoord(id:string){
    var url = 'https://geocode.maps.co/search?q=';
    console.log(url+id);
    this.http.get<any>(url+id).subscribe(data => {
      // this.location.lat = data[0].lat;
      // this.location.lng = data[0].lon;
      this.loadListings(data[0].lat,data[0].lon);
      console.log(data[0].boundingbox);
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
    console.log(this.activeSelected);
  }


  openModalWithComponent(id,pic,_price,beds,bathsfull, bathhalf,sqft, address) {
    const initialState: ModalOptions = {
      initialState: {
        id:id,
        listingPictures:pic,
        bathFull:bathsfull,
        bathsHalf:bathhalf,
        bedroom:beds,
        estimatedSquareFeet:sqft,
        fullAddress: address,
        price:_price
      }
    };
    this.bsModalRef = this.modalService.show(ForsaleListingComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  async redirect_listing(){
    if(!localStorage.getItem('_direct')){
      localStorage.setItem('_direct', 'no reload')
      location.reload();
    } else {
      localStorage.removeItem('_direct');
      document.getElementById("divFirst").scrollIntoView();
      
    }
  }


  
  async mapViewTablet(){
    if(this.isMapView==false){
      this.zIndex = '4';
      this.isMapView=true;
      this.zMap = 5;
      this.zPagination = '5';
    }
    else{
      this.zMap = 3;
      this.zIndex = '0';
      this.isMapView=false;
      this.zPagination = '0';
    }
  }
 
  @HostListener('window:resize', ['$event'])
  async searchMobile(): Promise<void>{
    if(window.matchMedia('(max-width:450px)').matches){
      this.isMapView=true;
      console.log(this.isMapView);
      this.mapView();
    }
  
  

  



  }

  @HostListener('window:resize', ['$event'])
  async mapView(){
    console.log(this.isMapView);
    if(this.isMapView==false){
      this.zIndex = '3';
      this.mapDisplay= 'inline-flex';
      
      this.isMapView=true;
      this.zMap = 5;
      this.zPagination = '5';
    }
    else {
      this.zMap = 3;
      this.zIndex = '0';
      this.mapDisplay= 'none';
      
      this.isMapView=false;
      this.zPagination = '0';

    }

    return;
  }

  async zoomChange(e:any){
    console.log('SCROLL');
    console.log(e.target.getZoom());
  }

  

  async searchListing(e:string='CA'){
    this.listingParams.fulladdress = e;
    this.isSearch=true;
    console.log(this.listingParams.fulladdress);
    this.loadListings();

  }

  async pageChanged(event: any){
    this.listingParams.pageNumber = event.page;
   
    const bounds = this.map;
    
    console.log(bounds);
    let url = `https://geocode.maps.co/reverse?lat=${bounds.latitude}&lon=${bounds.longitude}`;
    this.http.get<any>(url).subscribe(data => {
      //this.updateListings(data.boundingbox);
      console.log(data);
      console.log(data.address.postcode+' '+data.address.state);
      this.loadListings();

    });
    
  
    //

  }

  async pricechange(e){
    this.listingParams.price=e;
    this.currentPrice = e;
    this.loadListings();
    console.log(this.listingParams.price);
  }

  async priceSort(e){
    this.listingParams.priceSort = e;
    if(this.listingParams.priceSort== -1){
      this.pricesortHTML ='<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
      this.currentSort='Price Sort';
    }
    else if(this.listingParams.priceSort== 1) {
      this.pricesortHTML ='<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>';
      this.currentSort = '(High to Low)';
    }
    else{
      this.pricesortHTML ='<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>';
      this.currentSort ='(Low to High)';
    }
    this.loadListings();
    console.log(this.listingParams.priceSort);

  }


 

  async bedchange(e:number){
    this.listingParams.bedrooms=e;
    this.currentBed = e;
    this.loadListings();
    console.log(this.listingParams.bedrooms);
  }

  async bathchange(e:number){
    this.listingParams.bathtotals=e;
    this.currentBath = e;
    this.loadListings();
    console.log(this.listingParams.bathtotals);
  }

  @HostListener('window:resize', ['$event'])
  async listingNotHovered(e){
    if((e.target.getAttribute("id"))!== null){
      
    

    for(let i = 0; i < this.listings.length; i++){
      if(this.listings[i].id === e.target.id){
        if(window.matchMedia('(min-width:500px)').matches){
          this.listings[i].iconUrl =  '/assets/circle_4.png';
        }
        else{
          this.listings[i].iconUrl = '/assets/circle_2.png';
        }
        console.log(this.listings[i].id,this.listings[i].isHovered);
      }
        
    }
  }
      
   }



   @HostListener('window:resize', ['$event'])
   async listingHovered(e){
    if((e.target.getAttribute("id"))!== null){
      
    

    for(let i = 0; i < this.listings.length; i++){
      if(this.listings[i].id === e.target.id){
        if(window.matchMedia('(min-width:500px)').matches){
          this.listings[i].iconUrl =  '/assets/circle_4_hovered.png';
        }
        else{
          this.listings[i].iconUrl = '/assets/circle_2_hovered.png';
        }
        
        console.log(this.listings[i].id,this.listings[i].isHovered);
      }
        
    }
  }
      
   }

  async activeStatus(e){
    this.activeSelected = e.target.checked;
  
    if(this.activeSelected == true){
      this.listingParams.activeStatus='ACTIVE';
      console.log(this.listingParams.activeStatus);
      this.loadListings();
    }
    else{
      this.listingParams.activeStatus='';
      console.log(this.listingParams.activeStatus);
      this.loadListings();
    }
    //console.log(this.listingParams.activeStatus);
  }


  async contingentStatus(e){
    this.contingentSelected = e.target.checked;
   if(this.contingentSelected == true){
     this.listingParams.contingentStatus='CONTINGENT';
     console.log(this.listingParams.contingentStatus);
     this.loadListings();
   }
   else{
     this.listingParams.contingentStatus='';
     console.log(this.listingParams.contingentStatus);
     this.loadListings();
   }
  }

  async pendingStatus(e){
    this.pendingSelected = e.target.checked;

     if(this.pendingSelected == true){
      this.listingParams.pendingStatus='PENDING';
      console.log(this.listingParams.pendingStatus);
      this.loadListings();
    }
    else{
      this.listingParams.contingentStatus='';
      console.log(this.listingParams.contingentStatus);
      this.loadListings();
    }
  }

  async soldStatus(e){
    this.soldSelected = e.target.checked;

    if(this.soldSelected == true){
      this.listingParams.soldStatus='SOLD';
      console.log(this.listingParams.soldStatus);
      this.loadListings();
    }
    else{
      this.listingParams.soldStatus='';
      console.log(this.listingParams.soldStatus);
      this.loadListings();
    }
  }

  async bomStatus(e){
    this.bomSelected = e.target.checked;
    if(this.bomSelected == true){
      this.listingParams.bomStatus='BACK ON MARKET';
      console.log(this.listingParams.bomStatus);
      this.loadListings();
    }
    else{
      this.listingParams.bomStatus='';
      console.log(this.listingParams.bomStatus);
      this.loadListings();
    }
  }

  async withdrawnStatus(e){
    this.withdrawnSelected = e.target.checked;
    if(this.withdrawnSelected == true){
      this.listingParams.withdrawnStatus='BACK ON MARKET';
      console.log(this.listingParams.withdrawnStatus);
      this.loadListings();
    }
    else{
      this.listingParams.withdrawnStatus='';
      console.log(this.listingParams.withdrawnStatus);
      this.loadListings();
    }
  }

  async cancelledStatus(e){
    this.cancelledSelected = e.target.checked;
    if(this.cancelledSelected == true){
      this.listingParams.cancelledStatus='CANCELLED';
      console.log(this.listingParams.cancelledStatus);
      this.loadListings();
    }
    else{
      this.listingParams.cancelledStatus='';
      console.log(this.listingParams.cancelledStatus);
      this.loadListings();
    }
  }

  async expiredStatus(e){
  }

  async forecloseStatus(e){
    this.forecloseSelected = e.target.checked;
    console.log(this.forecloseSelected);
  }

  async estimatedSqFt(e){
    this.currentSqft = e;
    this.listingParams.estSqrFt = e;
    this.loadListings();
    }


  async lotSize(e){
    this.listingParams.lotSize = e;
    this.loadListings();
  }

  async redirect(id:string){
    this.router.navigate(['/listing/'+id]);
  }




}

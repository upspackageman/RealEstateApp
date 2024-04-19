import { ListingParams } from './../_models/listingParams';
import { MarkerParams } from './../_models/markerParams';
import { Listing } from './../_models/listing';
import { PaginatedResult } from './../_models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Marker } from '../_models/marker';
import { AccountService } from './account.service';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  baseUrl = environment.apiUrl;
  listings: Listing[] = [];
  listingCache = new Map();
  paginatedResult:PaginatedResult<Listing[]> = new PaginatedResult<Listing[]>;
  user: User |undefined;
  markers: Marker[] = [];
  markerCache = new Map();
  listingParams:ListingParams | undefined;


  constructor(private http: HttpClient, private accountService:AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) =>{
     
          this.listingParams = new ListingParams();
          this.user = user;
      }
    })
  }

  fetchCoordinates(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://nominatim.openstreetmap.org/search?q='+address+'&format=json&polygon_geojson=1&addressdetails=1')
        .subscribe({
          next: response => resolve(response),
          error: error => reject(error)
        });
    });
  }





  getListingParams(){

    return this.listingParams;
    
  }

  setListingParams(params: ListingParams){
    if(params.pageNumber !== this.listingParams?.pageNumber){
        params.pageNumber = 1;
    }
    this.listingParams = params;
  }

  resetListingParams(){
    this.listingParams = new ListingParams();
    return this.listingParams;
  }

  getListings(listingParams: ListingParams) {


    var key = Object.values(listingParams).join('-');
    var response = this.listingCache.get(key);


    let params = this.getPaginationHeaders(listingParams.pageNumber, listingParams.pageSize)
    params = params.append('price', listingParams.price.toString());
    params = params.append('bedrooms', listingParams.bedrooms.toString());
    params = params.append('bathtotals', listingParams.bathtotals.toString());
    params = params.append('activeStatus', listingParams.activeStatus);
    params = params.append('pendingStatus', listingParams.pendingStatus);
    params = params.append('contingentStatus', listingParams.contingentStatus);
    params = params.append('withdrawnStatus', listingParams.withdrawnStatus);
    params = params.append('cancelledStatus', listingParams.cancelledStatus);
    params = params.append('bomStatus', listingParams.bomStatus);
    params = params.append('expiredStatus', listingParams.expiredStatus);
    params = params.append('comingsoonStatus', listingParams.comingsoonStatus);
    params = params.append('soldStatus', listingParams.soldStatus);
    params = params.append('zipcode', listingParams.zipcode.toString());
    params = params.append('fulladdress', listingParams.fulladdress);
    params = params.append('lotsize', listingParams.lotSize);
    params = params.append('estimatedsquarefeet', listingParams.estSqrFt.toString());
    params = params.append('pricesort', listingParams.priceSort.toString());

   
    
  

   if (response!==undefined) {
 
     return of(response)
   }
   else{
   
    return this.getPaginatedResults<Listing[]>(this.baseUrl + 'listings', params)
      .pipe(map(response => {
        this.listingCache.set(Object.values(listingParams).join('-'), response);
        return response;
      }))

    }
  }

  getListingsById(id: string) {
   
   
    const listing = [...this.listingCache.values()].reduce((arr,elem)=>arr.concat(elem.result),[]).find((listing:Listing) =>listing.id ===id);
    if(listing) return of(listing);
  
    return this.http.get<Listing>(this.baseUrl + 'listings/' + id);
  }


  private getPaginatedResults<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));

        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }



}
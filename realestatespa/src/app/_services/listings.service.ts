import { ListingParams } from './../_models/listingParams';
import { Listing } from './../_models/listing';
import { PaginatedResult } from './../_models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  baseUrl = environment.apiUrl;
  listings: Listing[]=[];
  listingCache = new Map();



constructor(private http: HttpClient) { }

getListings(listingParams: ListingParams){
  var response =this.listingCache.get(Object.values(listingParams).join('-'));
  if(response){
    return of(response)
  }

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


  return this.getPaginatedResults<Listing[]>(this.baseUrl + 'listings', params)
    .pipe(map(response => {
      this.listingCache.set(Object.values(listingParams).join('-'), response);
      console.log(response);
      return response;
    }))
}

getListingsById(id:string){
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
        console.log();
        console.log(paginatedResult);
        console.log(paginatedResult.pagination);
        return paginatedResult;
      })
    );
  }

private getPaginationHeaders (pageNumber: number, pageSize: number){
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
}



}

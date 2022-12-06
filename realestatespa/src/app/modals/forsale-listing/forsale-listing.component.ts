import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-forsale-listing',
  templateUrl: './forsale-listing.component.html',
  styleUrls: ['./forsale-listing.component.css']
})
export class ForsaleListingComponent implements OnInit {
  id:string;
  listingPictures:string;
  bathFull:number;
  price:string;
  bathsHalf:number;
  bathfull:number;
  estimatedSquareFeet:number;
  bedrooms:number;
  fullAddress:string;
  closeBtnName?: string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}

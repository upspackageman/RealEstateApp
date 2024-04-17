import { Component, OnInit, Input } from '@angular/core';
import { Listing } from '../_models/listing';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  @Input() listing: Listing;
  
  constructor() { }

  ngOnInit() {
  }

}

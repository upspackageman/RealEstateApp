export interface Listing {
    id: string;
    mls: string;
    fullAddress: string;
    price: string;
    state:string;
    bathTotals: number;
    bathFull: number;
    bathsHalf: number;
    bedrooms: number;
    city: string;
    county: string;
    diningRoomDimensions?: any;
    homeOwnerFees: string;
    lotSize?: any;
    masterBedroomDimensions?: any;
    neighborhood?: any;
    parkingSpacesTotal: number;
    status: string;
    waterDistrict?: any;
    waterDistrictURL?: any;
    zip: number;
    walkScore?: any;
    yearBuilt: number;
    livingRoomDimensions?: any;
    kitchenDimensions?: any;
    type?: any;
    daysOnMarket: number;
    listingPictures: string;
    estimatedSquareFeet: string;
    priceSearch: number;
    highSchoolURL?: any;
    lng: number;
    lat: number;
    iconUrl: string;
    isHovered: boolean;
    isChecked:boolean;
   
  }
  
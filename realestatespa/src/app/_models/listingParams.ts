export class ListingParams
{
  price:number= -1;
  pageNumber:number= 1;
  pageSize:number = 40;
  bedrooms: number =-1;
  bathtotals: number =-1;
  activeStatus:string ="ACTIVE";
  contingentStatus:string ="CONTINGENT";
  pendingStatus:string ="PENDING";
  soldStatus:string ="SOLD";
  bomStatus:string ="BACK ON MARKET";
  withdrawnStatus:string ="WITHDRAWN";
  expiredStatus:string ="EXPIRED";
  comingsoonStatus:string ="COMING SOON";
  cancelledStatus:string ="CANCELLED";
  zipcode:number=-1;
  fulladdress:string = "92008";
  lotSize:string="0";
  estSqrFt:number =-1;
  priceSort:number = -1;
}

using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace API.Entities
{    [Index( nameof(PriceSearch), nameof(MLS), nameof(Id), nameof(Status), nameof(BathTotals), nameof(Bedrooms))]
    public class Listing
    {
        
        [Key]
        public string Id {get; set;}
        

        public string MLS {get;set;}

        [StringLength(250)]
        public string FullAddress {get; set;}

        public string Price {get;set;}

        public int BathTotals {get;set;} 

        public int BathFull {get;set;}

        public int  BathsHalf {get; set;}

        public int Bedrooms {get;set;}

        public string City {get;set;}

        public string County {get;set;}

        public string DiningRoomDimensions {get;set;}

        public string HomeOwnerFees{get;set;}

        public string LotSize {get;set;}

        public string MasterBedroomDimensions {get;set;}

        public string Neighborhood {get;set;}

        public string State {get;set;}

        public string Status {get;set;}

        public string WaterDistrict{get;set;}

        public string WaterDistrictURL {get;set;}

        public int Zip {get;set;} 

        public string WalkScore {get;set;}

        public int YearBuilt {get;set;}

        public string LivingRoomDimensions{get;set;}

        public string KitchenDimensions{get;set;}

        public string Type {get;set;}

        public int DaysOnMarket {get;set;}

        public string ListingPictures {get;set;}

        public int EstimatedSquareFeet {get;set;}

        public string HighSchool {get;set;}

        public string ElementarySchool {get;set;}

        public string MiddleSchool {get;set;}

       public string ListingDate {get;set;}

        public string Community {get;set;}

        public int PriceSearch {get;set;}

        public double Lat {get;set;}

        public double Lng {get;set;}
        
    }
}
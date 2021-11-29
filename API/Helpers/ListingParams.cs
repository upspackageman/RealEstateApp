namespace API.Helpers
{
    public class ListingParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber {get;set;} = 1; 

        private int _pageSize = 10; 

        public int PageSize
        {
            get => _pageSize;
            set=> _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string FullAddress {get;set;} = "92008";

        public int Price {get;set;} = -1; 
        
        public int PriceMin {get;set;} = -1; 
        
        public int PriceMax {get;set;} = -1; 

    
        public int BathTotals {get;set;} = -1; 

        public int BathFull {get;set;} = -1; 

        public int BathsFull {get;set;} = -1; 

        public int Bedrooms {get;set;} = -1; 

        public string City {get;set;}

        public string Neighborhood {get;set;}

        public string County {get;set;}

        public string Status {get;set;} = "not avaialble";

        public int Zipcode {get;set;} = -1; 

        public int YearBuilt {get;set;} = -1; 

        public int DaysOnMarket {get;set;} = -1; 

        public string Search {get;set;}="";

        public string Type {get;set;} = "not avaiable";

        public int EstimatedSquareFeet {get;set;} = -1;

        public string ActiveStatus {get;set;} = "";
        public string PendingStatus {get;set;} = "";

        public string ContingentStatus {get;set;} = "";
        public string SoldStatus {get;set;} = "";

        public string BOMStatus {get;set;} = "";

        public string ComingSoon {get;set;} = "";

        public string WithdrawnStatus {get;set;} = "";

        public string CancelledStatus {get;set;} = "";

        public string ExpiredStatus {get;set;} = "";

        public string HoldStatus {get;set;} = "";

        public string LotSize {get;set;}= "";

        //public int PriceSort {get;set;} = -1;







    }
}
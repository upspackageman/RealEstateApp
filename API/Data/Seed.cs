using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using API.Entities;
using System.Collections.Generic;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedListings(DataContext context)
        {
            if (await context.Listings.AnyAsync()) return;
            var listingData = await System.IO.File.ReadAllTextAsync("Data/SeedData.json"); 
            var listings = JsonConvert.DeserializeObject<List<Listing>>(listingData);
           
            // var url = "";
            // var client = new RestClient(url);
            // var request = new RestRequest(url, DataFormat.Json);
            // var response = client.Get(request);
            // var coord = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(response.Content);
            // await coord.result.addressMatches[0].coordinates.x;
         
            //string _price ="";


            foreach (var listing in listings){
                listing.FullAddress = listing.FullAddress +" "+listing.City+" "+listing.State+" "+listing.zip; 
                
               //url = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address="+listing.FullAddress+"&benchmark=2020&format=json";

                listing.Id = Guid.NewGuid().ToString();

                

                if(listing.ListingPictures.Contains("120/90")){
                    listing.ListingPictures = listing.ListingPictures.Replace("120/90","1200/900");
                }
                else if(listing.ListingPictures.Contains("thumb")){
                    listing.ListingPictures = listing.ListingPictures.Replace("thumb","X-LARGE");
                }

                if(listing.MiddleSchool.Contains(";")){
                    listing.MiddleSchool = listing.MiddleSchool.Split(";")[0];
                }

                if(listing.HighSchool.Contains(";")){
                    listing.MiddleSchool = listing.MiddleSchool.Split(";")[0];
                }

                if(listing.ElementarySchool.Contains(";")){
                    listing.MiddleSchool = listing.MiddleSchool.Split(";")[0];
                }

                // if(listing.Price.Contains("-")){
                //     _price = listing.Price.Split("-")[0].ToString();
                //     listing.PriceSearch = int.Parse(_price); 
                // }
                // else{
                //     _price = listing.Price.Replace("$","");
                //     _price = _price.Replace(",","").ToString();
                //      listing.PriceSearch = int.Parse(_price); 
                // }

                // listing.Lat = coord.result.addressMatches[0].coordinates.x;
                // listing.Lon = coord.result.addressMatches[0].coordinates.y;
                context.Listings.Add(listing);

            }
           await context.SaveChangesAsync();
            //Console.WriteLine(g+": "+ coord.result.addressMatches[0].coordinates);
            
            
        }
    }
}
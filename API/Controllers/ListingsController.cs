using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;


namespace API.Controllers
{  
    [ApiController]
    [Route("api/[controller]")]
    public class ListingsController : BaseApiController
    {
        private readonly IListingRepository _listingRepository;
        private readonly IMapper _mapper;    

      
        public ListingsController(IListingRepository listingRepository, IMapper mapper)
        {
            _mapper = mapper;
            _listingRepository = listingRepository;
        }

        

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListingDto>>> GetListings([FromQuery] ListingParams listingParams)
        {
             var listings = await _listingRepository.GetListingsAsync(listingParams);
             //var url = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=1212%20Mitchell%20ST%20Oceanside%20CA%2092054&benchmark=2020&format=json";
             //var _price ="";
             Response.AddPaginationHeader(listings.CurrentPage, listings.PageSize, listings.TotalCount, listings.TotalPages); 
             
            

            //  foreach(var listing in listings){

            //      var url = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address="+listing.FullAddress+"&benchmark=2020&format=json";
            //      var client = new RestClient(url);
            //      var request = new RestRequest(url, DataFormat.Json);
            //      var response = client.Get(request);
            //      var coord = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(response.Content);
            //      listing.Lat = coord.result.addressMatches[0].coordinates.x;
            //      listing.Lon = coord.result.addressMatches[0].coordinates.y;
            // }

              
            

            return Ok(listings);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Listing>> GetListingById(string id)
        {

            return Ok(await _listingRepository.GetListingByIdAsync(id));
        }


    }
}
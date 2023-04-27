using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
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
        private readonly IMapper _mapper;    

        private readonly IUnitOfWork _unitOfWork;
      
        public ListingsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
           _unitOfWork = unitOfWork;
            _mapper = mapper;
           
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListingDto>>> GetListings([FromQuery] ListingParams listingParams)
        {
             var listings = await _unitOfWork.ListingRepository.GetListingsAsync(listingParams);
             var regex = new Regex("[^0-9\\s]");

             foreach (var item in listings)
             {
                item.FullAddress = item.FullAddress.Replace(item.FullAddress, $"XXXX XXXXX  {item.City}, {item.State}");
             }
             
             Response.AddPaginationHeader(listings.CurrentPage, listings.PageSize, listings.TotalCount, listings.TotalPages); 

            return Ok(listings);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Listing>> GetListingById(string id)
        {
            var listing = await _unitOfWork.ListingRepository.GetListingByIdAsync(id);
            listing.FullAddress = listing.FullAddress.Replace(listing.FullAddress, $"XXXX XXXXX  {listing.City}, {listing.State}");
            return Ok(listing);
        }


    }
}
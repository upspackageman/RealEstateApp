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
//([FromQuery] ListingParams listingParams)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListingDto>>> GetListings([FromQuery] ListingParams listingParams)
        {
             var listings = await _listingRepository.GetListingsAsync(listingParams);

             Response.AddPaginationHeader(listings.CurrentPage, listings.PageSize, listings.TotalCount, listings.TotalPages); 

            //var listings= await _listingRepository.GetListingsAsync();
            return Ok(listings);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Listing>> GetListingById(string id)
        {

            return Ok(await _listingRepository.GetListingByIdAsync(id));
        }


    }
}
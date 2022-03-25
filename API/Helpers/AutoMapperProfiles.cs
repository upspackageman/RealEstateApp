using API.Entities;
using AutoMapper;
using API.DTOs;

namespace API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Listing,ListingDto>();
           // CreateMap<CustomerUser,RegisterDto>();
           

        }
    }
}
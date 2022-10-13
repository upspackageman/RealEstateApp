using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IListingRepository
    {
        void Update(Listing listing);       
        Task<Listing> GetListingByIdAsync(string id);

        Task<IEnumerable<Listing>> GetListingsAsync();

        Task<PagedList<ListingDto>> GetListingsAsync(ListingParams listingParams); 
    }
}
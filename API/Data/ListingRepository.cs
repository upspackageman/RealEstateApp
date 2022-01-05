using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;



namespace API.Data
{
    public class ListingRepository : IListingRepository
    {
        private readonly DataContext _context;

        private readonly IMapper _mapper;
        public ListingRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        

        public async Task<Listing> GetListingByIdAsync(string id)
        {
            return await _context.Listings.FindAsync(id);
        }

        public async Task<IEnumerable<Listing>> GetListingsAsync()
        {
            return await _context.Listings.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Listing listing)
        {
            _context.Entry(listing).State = EntityState.Modified;
        }

       
        public async Task<PagedList<ListingDto>> GetListingsAsync(ListingParams listingParams)
        {
             
            var query =   _context.Listings.AsQueryable();

            query = listingParams.PriceSort switch{
               1 => query.OrderByDescending(x=> x.PriceSearch),
               _ =>  query.OrderBy(x=> x.PriceSearch)
            };           

            if(listingParams.Price != -1 ){
                query = query.Where(x=> x.PriceSearch <= listingParams.Price );
            }

            if(listingParams.BathTotals != -1 ){
                query = query.Where(x=> x.BathTotals >= listingParams.BathTotals );
            }

            if(listingParams.Type != "not avaiable" ){
                query = query.Where(x=> x.Type == listingParams.Type);
            }

            if(listingParams.Bedrooms != -1){
                query = query.Where(x=> x.Bedrooms >= listingParams.Bedrooms );
            }

            if(listingParams.Zipcode!=-1){
                query = query.Where(x=> x.zip == listingParams.Zipcode);
            }

            if(listingParams.EstimatedSquareFeet!=-1){
                 query = query.Where(x=> x.EstimatedSquareFeet >= listingParams.EstimatedSquareFeet);
            }

          query = query.Where(x=> x.FullAddress.Replace(",","").ToLower().Contains(listingParams.FullAddress.ToLower()) || x.FullAddress.ToLower().Contains(listingParams.FullAddress.ToLower()));
           
           query = query.Where(x=> x.Status == listingParams.ActiveStatus || x.Status == listingParams.PendingStatus || x.Status == listingParams.ContingentStatus || x.Status == listingParams.SoldStatus || x.Status == listingParams.BOMStatus || x.Status == listingParams.WithdrawnStatus || x.Status == listingParams.CancelledStatus || x.Status == listingParams.ExpiredStatus || x.Status == listingParams.ComingSoon || x.Status == listingParams.ComingSoon || x.Status == "" || x.Status == null);
            
             

            return await PagedList<ListingDto>.CreateAsync(query.ProjectTo<ListingDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), listingParams.PageNumber, listingParams.PageSize);
        }

        
    }
}
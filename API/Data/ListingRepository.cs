using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Collections.Generic;

namespace API.Data
{
    public class ListingRepository : IListingRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ICacheService _cacheService;

        public ListingRepository(DataContext context, IMapper mapper,ICacheService cacheService)
        {
            _context = context;
            _mapper = mapper;
            _cacheService = cacheService;
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
            var cacheKey = $"Listings_{listingParams.PageNumber}_{listingParams.PageSize}_{listingParams.ActiveStatus}_{listingParams.PendingStatus}_{listingParams.ContingentStatus}_{listingParams.BOMStatus}_{listingParams.SoldStatus}_{listingParams.Price}_{listingParams.PriceSort}_{listingParams.BathTotals}_{listingParams.Type}_{listingParams.Bedrooms}_{listingParams.Zipcode}_{listingParams.EstimatedSquareFeet}_{listingParams.FullAddress}";

            var cacheValue = await _cacheService.GetCacheAsync<IEnumerable<ListingDto>>(cacheKey);

            var query =   _context.Listings.AsQueryable();

            var listingStatus = new List<string>{listingParams.ActiveStatus, listingParams.PendingStatus,listingParams.ContingentStatus, listingParams.BOMStatus, listingParams.SoldStatus};

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
                query = query.Where(x=> x.Zip == listingParams.Zipcode);
            }

            if(listingParams.EstimatedSquareFeet!=-1){
                 query = query.Where(x=> x.EstimatedSquareFeet >= listingParams.EstimatedSquareFeet);
            }

            query = query.Where(x=> x.FullAddress.Replace(",","").Replace("  "," ").ToLower().Contains(listingParams.FullAddress.Replace(",","").ToLower()));
            
            //query =  query.Where(x=> x.FullAddress.ToLower().Contains(listingParams.FullAddress.ToLower()));
            
            query =query.Where(x=> listingStatus.Contains(x.Status));

            if(listingParams.PriceSort!=1){
                 query = query.OrderBy(x=> x.PriceSearch);
            }
            else{
                 query = query.OrderByDescending(x=> x.PriceSearch);
                 
            }

           // return await PagedList<ListingDto>.CreateAsync(query.ProjectTo<ListingDto>(_mapper.ConfigurationProvider).AsNoTracking(), listingParams.PageNumber, listingParams.PageSize);

            
    
         //   var listingStatus = new List<string>{listingParams.ActiveStatus, listingParams.PendingStatus,listingParams.ContingentStatus, listingParams.BOMStatus, listingParams.SoldStatus};

    
            if (cacheValue == null)
            {
                //var query = _context.Listings.AsQueryable();
                var expireTime = DateTimeOffset.Now.AddHours(24);
                await _cacheService.SetCacheAsync("listings", query, expireTime);
           
                // if(listingParams.PriceSort!=1){
                //     query = query.OrderBy(x=> x.PriceSearch);
                // }

                // if(listingParams.PriceSort==1){
                //     query = query.OrderByDescending(x=> x.PriceSearch);
                // }

                // if(listingParams.Price != -1 ){
                //     query = query.Where(x=> x.PriceSearch <= listingParams.Price );
                // }

                // if(listingParams.BathTotals != -1 ){
                //     query = query.Where(x=> x.BathTotals >= listingParams.BathTotals );
                // }

                // if(listingParams.Type != "not avaiable" ){
                //     query = query.Where(x=> x.Type == listingParams.Type);
                // }

                // if(listingParams.Bedrooms != -1){
                //     query = query.Where(x=> x.Bedrooms >= listingParams.Bedrooms );
                // }

                // if(listingParams.Zipcode!=-1){
                //     query = query.Where(x=> x.Zip == listingParams.Zipcode);
                // }

                // if(listingParams.EstimatedSquareFeet!=-1){
                //     query = query.Where(x=> x.EstimatedSquareFeet >= listingParams.EstimatedSquareFeet);
                // }

                
                
                

                // query = query.Where(x=> x.FullAddress.Replace(",","").Replace("  "," ").ToLower().Contains(listingParams.FullAddress.Replace(",","").ToLower()));
                
                // //query =  query.Where(x=> x.FullAddress.ToLower().Contains(listingParams.FullAddress.ToLower()));
                
                // query =query.Where(x=> listingStatus.Contains(x.Status));
                var totalCount = await query.CountAsync();
                var pagedQuery = query
                     .ProjectTo<ListingDto>(_mapper.ConfigurationProvider)
                     .AsNoTracking()
                     .Skip((listingParams.PageNumber - 1) * listingParams.PageSize)
                     .Take(listingParams.PageSize);

                var pagedData = await PagedList<ListingDto>.CreateAsync(pagedQuery, listingParams.PageNumber, listingParams.PageSize);


                await _cacheService.SetCacheAsync(cacheKey, pagedData, DateTimeOffset.Now.AddHours(24));

               

                return pagedData;
            }
            else{

                if(listingParams.PriceSort!=1){
                    cacheValue = cacheValue.OrderBy(x=> x.PriceSearch);
                }

                if(listingParams.PriceSort == 1){
                    cacheValue = cacheValue.OrderByDescending(x=> x.PriceSearch);
                }

                if(listingParams.Price != -1 ){
                    cacheValue = cacheValue.Where(x=> x.PriceSearch <= listingParams.Price );
                }

                if(listingParams.BathTotals != -1 ){
                    cacheValue = cacheValue.Where(x=> x.BathTotals >= listingParams.BathTotals );
                }

                if(listingParams.Type != "not avaiable" ){
                    cacheValue = cacheValue.Where(x=> x.Type == listingParams.Type);
                }

                if(listingParams.Bedrooms != -1){
                    cacheValue = cacheValue.Where(x=> x.Bedrooms >= listingParams.Bedrooms );
                }

                if(listingParams.Zipcode!=-1){
                    cacheValue = cacheValue.Where(x=> x.zip == listingParams.Zipcode);
                }

                if(listingParams.EstimatedSquareFeet!=-1){
                    cacheValue = cacheValue.Where(x=> x.EstimatedSquareFeet >= listingParams.EstimatedSquareFeet);
                }

                cacheValue = cacheValue.Where(x=> x.FullAddress.Replace(",","").Replace("  "," ").ToLower().Contains(listingParams.FullAddress.Replace(",","").ToLower()));
                
                
                return new PagedList<ListingDto>(cacheValue, cacheValue.Count(), listingParams.PageNumber, listingParams.PageSize);
                 
            }

            
           
             // return await PagedList<ListingDto>.CreateAsync(query.AsQueryable().ProjectTo<ListingDto>(_mapper
             //    .ConfigurationProvider).AsNoTracking(), listingParams.PageNumber, listingParams.PageSize);
        }

        
    }
}
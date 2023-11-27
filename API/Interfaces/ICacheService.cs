using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICacheService
    {
        Task<T> GetCacheAsync<T>(string key);
        Task SetCacheAsync<T>(string key, T data, DateTimeOffset expirationTime);
        Task<bool> IsCacheExistAsync(string key);
        Task RemoveCacheAsync(string key);
        
    }
}
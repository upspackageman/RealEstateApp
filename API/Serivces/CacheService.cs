using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace API.Serivces
{
    public class CacheService:ICacheService
    {
        private readonly IDatabase _database;
        
        public CacheService(IConnectionMultiplexer connectionMultiplexer)
        {
            //store endpoint in the configuration and pass if along to the service
            _database = connectionMultiplexer.GetDatabase();
            
        }

        public async Task<T> GetCacheAsync<T>(string key)
        {
            string json = await _database.StringGetAsync(key);

            if (json == null)
            {
                return default;
            }

                return JsonConvert.DeserializeObject<T>(json);
            }

         public async Task SetCacheAsync<T>(string key, T data,  DateTimeOffset expirationTime)
         {
             var options = expirationTime.DateTime.Subtract(DateTime.Now);

             string json = JsonConvert.SerializeObject(data);

             await _database.StringSetAsync(key, json, options);
         } 
       

        public async Task<bool> IsCacheExistAsync(string key)
        {
            return await _database.KeyExistsAsync(key);
        }

        public async Task RemoveCacheAsync(string key)
        {
            await _database.KeyDeleteAsync(key);
        }

    }

    

    
}
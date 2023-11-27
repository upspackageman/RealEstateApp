using System;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Serivces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
            services.AddScoped<ITokenService, TokenService>();
            services.AddSingleton<IConnectionMultiplexer>(provider =>
            {
                var configuration = ConfigurationOptions.Parse(config.GetSection("Redis:ConnectionString").Value);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddScoped<ICacheService, CacheService>();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            
            services.AddDbContext<DataContext>(options =>
            {
                
                //var stuff = config.GetConnectionString("DefaultConnection");
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
               
                /* MySQL setup */

                 if (env == "Development")
                {
                    // Use connection string from file.
                   //options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                   options.UseMySQL(config.GetConnectionString("DefaultConnection"));
                }
                else
                {
                    //options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                     options.UseMySQL(config.GetConnectionString("DefaultConnection"));
                }
                
            });
             
            return services;
        }
    }
}
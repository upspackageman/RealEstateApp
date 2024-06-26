using System;
using System.IO;
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
            var logFilePath = "app-log.txt";
            File.AppendAllText(logFilePath, "Configuration: " +config + Environment.NewLine);
            File.AppendAllText(logFilePath, "Configuration: " +config.GetSection("Redis:ConnectionString") + Environment.NewLine);

            services.AddSingleton<IConnectionMultiplexer>(provider =>
            {   var conn =config.GetSection("Redis:ConnectionString").Value;
                var configuration = ConfigurationOptions.Parse(conn);
                configuration.AbortOnConnectFail = false; // Set additional options if needed
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddScoped<ICacheService, CacheService>();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            
            services.AddDbContext<DataContext>(options =>
            {
                 //options.UseMySQL(config.GetConnectionString("DefaultConnection"));
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
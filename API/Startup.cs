using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using System;
using Serilog;
using System.IO;
using Newtonsoft.Json;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
             Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .CreateLogger();
            _config = config;          
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var logFilePath = "st-log.txt";
            File.AppendAllText(logFilePath, "Configuration: " +_config + Environment.NewLine);
            File.AppendAllText(logFilePath, "Configuration: " +_config.GetSection("EmailConfiguration").Get<EmailConfiguration>() + Environment.NewLine);
            File.AppendAllText(logFilePath, "Configuration: " +_config.GetSection("DefaultConnection").Get<EmailConfiguration>() + Environment.NewLine);
            File.AppendAllText(logFilePath, "Configuration: " +_config.GetConnectionString("DefaultConnection") + Environment.NewLine);
            File.AppendAllText(logFilePath, "Configuration: " +_config.GetConnectionString("DefaultConnection") + Environment.NewLine);
            File.AppendAllText(logFilePath, "Configuration: " +_config.GetConnectionString("TokenKey") + Environment.NewLine);
            File.AppendAllText(logFilePath, "Configuration: " + JsonConvert.SerializeObject(_config) + Environment.NewLine);
            services.AddApplicationServices(_config);
            services.AddControllers();
            services.AddCors();
            services.AddIdentityServices(_config);
            services.AddScoped<EmailConfiguration>(_ => _config.GetSection("EmailConfiguration").Get<EmailConfiguration>());
            
            services.AddDbContext<DataContext>(options =>{
                
                options.UseSqlServer(_config.GetConnectionString("DefaultConnection"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware<ExceptionMiddleware>();
            // if (env.IsDevelopment())
            // {
                // app.UseDeveloperExceptionPage();
            //    
            // }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(policy=>policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"));

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

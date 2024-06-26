using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext: IdentityDbContext<CustomerUser,AppRole, int, IdentityUserClaim<int>,  AppUserRole,IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {}

        public DbSet<CustomerUser> CustomerUsers { get; set; }
        public DbSet<Listing> Listings {get;set;}

        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);

            builder.Entity<Listing>()
                .HasIndex(x => x.Id)
                .IsUnique();

            builder.Entity<Listing>()
                .HasIndex(x => x.PriceSearch);

            builder.Entity<Listing>()
                .HasIndex(x => x.BathTotals);

            builder.Entity<Listing>()
                .HasIndex(x => x.Bedrooms);
            
            builder.Entity<Listing>()
                .HasIndex(x => x.Type);

            builder.Entity<Listing>()
                .HasIndex(x => x.Status);
            
            builder.Entity<CustomerUser>()
                .HasMany(ur =>ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
        
    }

  
}
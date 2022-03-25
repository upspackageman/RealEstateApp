using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class CustomerUser: IdentityUser<int>
    {
      
       public string FirstName { get; set; }  
       public string LastName { get; set; }
        public ICollection<AppUserRole> UserRoles {get;set;}     
    }
}
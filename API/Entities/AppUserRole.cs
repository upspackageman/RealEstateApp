using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUserRole: IdentityUserRole<int>
    {
        public CustomerUser User {get;set;}

        public AppRole Role {get;set;}

    }
}
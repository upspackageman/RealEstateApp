using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : BaseApiController
    {
        private readonly DataContext _context;

        public CustomersController(DataContext context)
        {
            _context = context;

        }
        [HttpGet]
        [Authorize]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CustomerUser>>> GetUsers()
        {
            var customerUsers =_context.CustomerUsers.ToListAsync();

            return await customerUsers;
        } 


        //api/customers/3
        [Authorize]
        [HttpGet("{id}")]

        public async Task<ActionResult<CustomerUser>> GetUser(int id)
        {
            return await  _context.CustomerUsers.FindAsync(id);

            
        } 
    }
}
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<CustomerUserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");

            using var hmac = new HMACSHA512();

            var user = new CustomerUser
            {
                Email = registerDto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName
            };

            _context.CustomerUsers.Add(user);
            await _context.SaveChangesAsync();

            return new CustomerUserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
                

            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<CustomerUserDto>> Login(LoginDto loginDto)
        {

            var user = await _context.CustomerUsers.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Invalid Email");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");

            }

            return new CustomerUserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user)

            };

        }


        private async Task<bool> UserExists(string Email)
        {
            return await _context.CustomerUsers.AnyAsync(x => x.Email == Email.ToLower());
        }
    }
}
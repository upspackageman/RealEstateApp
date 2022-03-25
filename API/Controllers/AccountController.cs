using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
       
        private readonly ITokenService _tokenService;
        private readonly UserManager<CustomerUser> _userManager;
        private readonly SignInManager<CustomerUser> _signInManager;
       
      
        public AccountController(UserManager<CustomerUser> userManager,SignInManager<CustomerUser> signInManager, ITokenService tokenService)
        {
         
            _signInManager= signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
           
        }

        [HttpPost("register")]
        public async Task<ActionResult<CustomerUserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");  

            var user = new CustomerUser();

            user.UserName = registerDto.Email.ToLower();
            user.Email = registerDto.Email.ToLower();
            user.FirstName = registerDto.FirstName;
            user.LastName = registerDto.LastName;


            var result = await _userManager.CreateAsync(user, registerDto.Password);   

            if(!result.Succeeded) return BadRequest(result.Errors);                 
            return new CustomerUserDto
            {
                Username = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user)
            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<CustomerUserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid Email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized();

            return new CustomerUserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }
        private async Task<bool> UserExists(string Email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == Email.ToLower());
        }

        public class SignInManger<T>
        {
        }
    }
}
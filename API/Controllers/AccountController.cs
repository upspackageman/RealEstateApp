using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
       
        private readonly ITokenService _tokenService;
        private readonly EmailConfiguration _emailConfig;
        private readonly UserManager<CustomerUser> _userManager;
        private readonly SignInManager<CustomerUser> _signInManager;


        private async Task<bool> UserExists(string Email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == Email.ToLower());
        }
        public class SignInManger<T>
        {
        }
       
      
        public AccountController(UserManager<CustomerUser> userManager,SignInManager<CustomerUser> signInManager, ITokenService tokenService, EmailConfiguration emailConfig)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _emailConfig = emailConfig;
        }

        [HttpPost("register")]
        public async Task<ActionResult<CustomerUserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");

            var user = new CustomerUser
            {
                UserName = registerDto.Email.ToLower(),
                Email = registerDto.Email.ToLower(),
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password); 
            //   var roleResult = await _userManager.AddToRoleAsync(user,"Member");

            if(!result.Succeeded) return BadRequest(result.Errors);                                 
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

             var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", user.Email }
            };

            
            
             var callback = QueryHelpers.AddQueryString(registerDto.ClientURI, param);
             callback = callback.Replace("5001/api", "");
             callback = callback.Replace("/e", "/#/e");
             
             var year = DateTime.Now.Year;
           
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Beverly Ward,  Burke Real Estate Consultant",_emailConfig.From));
            message.To.Add(new MailboxAddress("Recipient Name",registerDto.Email));
            message.Subject = "Confirm Registration";


            var builder = new BodyBuilder
            {
                HtmlBody = $"<html><head> <style> </style></head><body> <table class=\"x_wrapperTable x_mainBgColor\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" min-scale=\"0.8540478905359179\" style=\"transform: scale(0.854048, 0.854048); transform-origin: left top; font-family:'Oswald',sans-serif; @import url(https://fonts.googleapis.com/css?family=Oswald:300,400,700);@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic);\"> <tbody> <tr> <td> <table class=\"x_contentTable x_setWidthOut x_content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"> <tbody> <tr> <td class=\"x_header x_innerpadding\" style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);\"> <div class=\"x_logo\" align=\"center\"> <center> <!-- <table border=\"0\" cellspacing=\"8\"> <tbody> <tr> <td align=\"center\"><img data-imagetype=\"External\" src=\"\" height=\"100px;\" align=\"center\" alt=\"\"> </td> </tr> </tbody> </table> --> <h2 class=\"x_h2\" style=\"font-weight: 500; letter-spacing:2.8px; \">Email Confirmation </h2> </center> </div> </td> </tr> <tr> <td class=\"x_innerpadding x_borderbottom x_email-info\"> <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td> <!-- <h2 class=\"x_h2\" style=\"padding-top: 20px; padding-bottom: 10px; margin-left: 3%; font-weight: 400; letter-spacing:2.8px;\" >Email Confirmation Link <b></b>is now available! </h2> --> </td> </tr> <tr> <td style=\"padding-top: 20px; padding-bottom: 25px; background: linear-gradient(90deg, rgba(255, 255, 249, 0.075) 0%, rgba(224, 226, 157, 0.075) 37%, rgba(248, 248, 237, 0.089) 100%);\" style=\"margin-left: 3%; margin-bottom: 1%;\"> <p class=\"x_setWidthIn\" style=\"margin-left: 3%; font-size: 25px; font-weight: 300; letter-spacing:.5px;\">Click the button below to complete registration.</p> <p class=\"x_reg-button\" style=\"margin-left: 3%; margin-bottom: 1%;\"><a href=\"{callback}\" target=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"Verified\" align=\"center\" originalsrc=\"{callback}\" style=\"text-decoration: none; font-size:26px; background: linear-gradient(90deg, rgba(229, 231, 172, 0.596) 0%, rgba(224, 226, 157, 0.274) 37%, rgba(224, 226, 155, 0.644) 100%); padding:10px; border-color: #e9df8f; border-style:outset; color:#000000; \" title=\"Original URL: {callback}. Click or tap if you trust this link.\" data-linkindex=\"0\">Complete Registration </a></p> <!-- <p class=\"x_setWidthIn\">If you have any questions or difficulties, --> <!-- contact your administrator</p> --> </td> </tr> </tbody> </table> </td> </tr> <tr style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\"> <td class=\"x_copyright\"></td> </tr> <tr class=\"x_blackBgColor\" style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\"> <td class=\"x_footer\"> <h4 style=\"font-weight: 100; margin-left: 3%;\">© {year} Beverly Ward, REALTOR® a Burke Real Estate Consultant California DRE#01992425</h4> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>" 
            };

            message.Body = builder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
                client.Authenticate(_emailConfig.Username, _emailConfig.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }   
            

           // await _userManager.AddToRoleAsync(user,"Member"); 
        
            return StatusCode(201); 
        }


        [HttpGet("EmailConfirmation")]
        public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("Invalid Email Confirmation Request");
            var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
            if (!confirmResult.Succeeded)
                return BadRequest("Invalid Email Confirmation Request");
            
            /* return new CustomerUserDto
            {
                Username = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = await _tokenService.CreateToken(user)
            }; */
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<CustomerUserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());
            

            if (user == null){ 
                return Unauthorized("Invalid Email");
            }

            

            if (!await _userManager.IsEmailConfirmedAsync(user)) return Unauthorized("Email is not confirmed");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized();

            return new CustomerUserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("",_emailConfig.From));
            message.To.Add(new MailboxAddress("",forgotPasswordDto.Email));
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);

            if (user == null)
                return BadRequest("Invalid Request");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", forgotPasswordDto.Email }
            };

            var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);
            callback = callback.Replace("5001/api", "");
            callback = callback.Replace("/r", "/#/r");
             
            var year = DateTime.Now.Year;
            var builder = new BodyBuilder
            {
                HtmlBody = $"<html><head></head><body style=\"transform: scale(0.854048, 0.854048); transform-origin: left top; font-family:'Oswald',sans-serif; @import url(https://fonts.googleapis.com/css?family=Oswald:300,400,700);@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic);\"> <table class=\"x_wrapperTable x_mainBgColor\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" min-scale=\"0.8540478905359179\" > <tbody> <tr> <td> <table class=\"x_contentTable x_setWidthOut x_content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"> <tbody> <tr> <td class=\"x_header x_innerpadding\" style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);\"> <div class=\"x_logo\" align=\"center\"> <center> <!-- <table border=\"0\" cellspacing=\"8\"> <tbody> <tr> <td align=\"center\"><img data-imagetype=\"External\" src=\"\" height=\"100px;\" align=\"center\" alt=\"\"> </td> </tr> </tbody> </table> --> <h2 class=\"x_h3\" style=\"font-weight: 500; letter-spacing:2.3px; \">Reset Password Link <b></b>is Now Available! </h2> </center> </div> </td> </tr> <tr> <td class=\"x_innerpadding x_borderbottom x_email-info\" > <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td> </td> </tr> <tr> <td style=\"padding:20px; background: linear-gradient(90deg, rgba(255, 255, 249, 0.075) 0%, rgba(224, 226, 157, 0.075) 37%, rgba(248, 248, 237, 0.089) 100%);\"> <p style=\"margin-left: 3%; font-size: 22px; font-weight: 200; letter-spacing:.5px;\" class=\"x_setWidthIn\">Click the button below to reset password.</p> <p class=\"x_reg-button\" style=\"margin-left: 3%; margin-bottom: 1%;\"> <a style=\"text-decoration: none; color:#000000; font-size:18px; background: linear-gradient(90deg, rgba(229, 231, 172, 0.596) 0%, rgba(224, 226, 157, 0.274) 37%, rgba(224, 226, 155, 0.644) 100%) ; padding:10px; border-style:outset; border-width: 2px;\" href=\"{callback}\" target=\"_blank\" rel=\"noopener noreferrer\" data-auth=\"Verified\" align=\"center\" originalsrc=\"{callback}\" title=\"Original URL: {callback}. Click or tap if you trust this link.\" data-linkindex=\"0\">Reset Password</a> </p> <!-- <p class=\"x_setWidthIn\">If you have any questions or difficulties, --> <!-- contact your administrator</p> --> </td> </tr> </tbody> </table> </td> </tr> <tr style=\" background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\"> <td class=\"x_copyright\"></td> </tr> <tr class=\"x_blackBgColor\" style=\" background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\"> <td class=\"x_footer\"> <h4 style=\"margin-left: 3%; font-weight: 400; letter-spacing:1.3px;\">© {year} Beverly Ward, REALTOR® a Burke Real Estate Consultant California DRE:#01992425</h4> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>"
            };
            message.Body = builder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
                client.Authenticate(_emailConfig.Username, _emailConfig.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
           
            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");
            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors;
                return BadRequest(new { Errors = errors });
            }
            return Ok();
        }

    }
}
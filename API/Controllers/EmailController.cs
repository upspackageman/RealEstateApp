using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.Interfaces;
using System;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class EmailController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly EmailConfiguration _emailConfig;

        public EmailController(IUnitOfWork unitOfWork, EmailConfiguration emailConfig)
        {
           _unitOfWork = unitOfWork;
           _emailConfig = emailConfig;
        }
        
        [HttpPost]
        public async Task<IActionResult> SendMail([FromBody]Email email)
        {
            
            var year = DateTime.Now.Year;

            var listing = await _unitOfWork.ListingRepository.GetListingByIdAsync(email.Listing);

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Sender Name",email.From));
            message.To.Add(new MailboxAddress("Recipient Name",_emailConfig.From));
            message.Subject = $"{email.Subject} Client: {email.LastName}, {email.FirstName}";
            if (!string.IsNullOrEmpty(email.Cc))
            {
                message.Cc.Add(new MailboxAddress("",email.Cc));
            }
            var builder = new BodyBuilder
            {
                HtmlBody = $"<html><head></head><body> <table class=\"x_wrapperTable x_mainBgColor\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" min-scale=\"0.8540478905359179\" style=\"transform: scale(0.854048, 0.854048); transform-origin: left top; font-family:'Oswald',sans-serif; @import url(https://fonts.googleapis.com/css?family=Oswald:300,400,700);@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic);\"> <tbody> <tr> <td> <table class=\"x_contentTable x_setWidthOut x_content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"> <tbody> <tr> <td class=\"x_header x_innerpadding\" style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);\"> <div class=\"x_logo\" align=\"center\" style=\" background: linear-gradient(90deg, rgba(255, 255, 249, 0.075) 0%, rgba(224, 226, 157, 0.075) 37%, rgba(248, 248, 237, 0.089) 100%); line-height:60px\"> <center> <!-- <table border=\"0\" cellspacing=\"8\"> <tbody> <tr> <td align=\"center\"><img data-imagetype=\"External\" src=\"\" height=\"100px;\" align=\"center\" alt=\"\"> </td> </tr> </tbody> </table> --> <h1 class=\"x_h2\" style=\"font-weight: 500; letter-spacing:2.3px; \">Property Inquiry </h1> </center> </div> </td> </tr> <tr> <td class=\"x_innerpadding x_borderbottom x_email-info\" style=\"padding:20px; background: linear-gradient(90deg, rgba(255, 255, 249, 0.075) 0%, rgba(224, 226, 157, 0.075) 37%, rgba(248, 248, 237, 0.089) 100%);\"> <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <h2 style=\"text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);margin-left: 3%;font-weight: 400;letter-spacing:.75px;\">Property Info</h2> <ul> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px; font-weight: 100; letter-spacing:.75px;\">Address:{listing.FullAddress}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px; font-weight: 100;letter-spacing:.75px;\">MLS:{listing.MLS}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px; font-weight: 100; letter-spacing:.75px;\">STATUS:{listing.Status}</h4> </li> </ul> </tr> <tr> <h2 style=\"text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);margin-left: 3%;font-weight:400; letter-spacing:.75px;\">Client Info</h2> <ul> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px; font-weight: 100; letter-spacing:.75px;\">Client's Name: {email.FirstName} {email.LastName}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\" font-size:18px;font-weight: 100; letter-spacing:.75px;\">Email: {email.From}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px;font-weight: 100; letter-spacing:.75px;\">Phone: {email.Phone}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px;font-weight: 100;letter-spacing:.75px;\">Agent's Name: {email.AgentName}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px;font-weight: 100; letter-spacing:.75px;\">Email: {email.AgentEmail}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px;font-weight: 100;letter-spacing:.75px;\">Phone: {email.AgentPhone}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:18px;font-weight: 100;letter-spacing:.75px;\">Message: {email.Message}</h4> </li> </ul> </tr> </tbody> </table> </td> </tr> <tr> <td style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\" class=\"x_copyright\"></td> </tr> <tr class=\"x_blackBgColor\"> <td style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\" class=\"x_footer\"> <h4 style=\"font-weight: 100; margin-left: 3%;\">© {year} Beverly Ward, REALTOR® a Burke Real Estate Consultant California DRE#01992425</h4> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>"
                
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

        [HttpPost("contact")]
        public async Task<IActionResult> SendContactMail([FromBody]Email email)
        {
             var year = DateTime.Now.Year;
            
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Sender Name",email.From));
            message.To.Add(new MailboxAddress("Recipient Name",_emailConfig.From));
            message.Subject = $"{email.Subject} Client: {email.LastName}, {email.FirstName}";
            if (!string.IsNullOrEmpty(email.Cc))
            {
                message.Cc.Add(new MailboxAddress("",email.Cc));
            }

             var builder = new BodyBuilder
            {
                HtmlBody = $"<html><head></head><body> <table class=\"x_wrapperTable x_mainBgColor\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" min-scale=\"0.8540478905359179\" style=\"transform: scale(0.854048, 0.854048); transform-origin: left top; font-family:'Oswald',sans-serif; @import url(https://fonts.googleapis.com/css?family=Oswald:300,400,700);@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic);\"> <tbody> <tr> <td> <table class=\"x_contentTable x_setWidthOut x_content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"> <tbody> <tr> <td class=\"x_header x_innerpadding\" style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);\"> <div class=\"x_logo\" align=\"center\"> <center> <h1 class=\"x_h2\" style=\"font-weight: 500; letter-spacing:2.3px;\">Contact Inquiry </h1> <!-- <table border=\"0\" cellspacing=\"8\"> <tbody> <tr> <td align=\"center\"><img data-imagetype=\"External\" src=\"\" height=\"100px;\" align=\"center\" alt=\"\"> </td> </tr> </tbody> </table> --> </center> </div> </td> </tr> <tr> <td class=\"x_innerpadding x_borderbottom x_email-info\" style=\"background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 253, 249) 55%);\"> <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <h2 style=\"text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);margin-left: 3%;font-weight: 400; letter-spacing:2.3px;\"> Contact Info</h2> <ul style=\"margin-left: 3%;\"> <li style=\" list-style-type: none;\" style=\" list-style-type: none;\"> <h4 style=\"font-size:20px; font-weight: 100; letter-spacing:.75px;\"> Name: {email.FirstName} {email.LastName}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:20px; font-weight: 100; letter-spacing:.75px;\"> Email: {email.From}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:20px; font-weight: 100; letter-spacing:.75px;\"> Phone: {email.Phone}</h4> </li> <li style=\" list-style-type: none;\"> <h4 style=\"font-size:20px; font-weight: 100; letter-spacing:.75px;\"> Message: {email.Message}</h4> </li> </ul> </tr> </tbody> </table> </td> </tr> <tr style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\"> <td class=\"x_copyright\"></td> </tr> <tr class=\"x_blackBgColor\" style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\"> <td class=\"x_footer\" style=\"background: linear-gradient(90deg, rgb(245, 232, 157) 0%, rgb(238, 211, 154) 55%);\"> <h4 style=\"font-weight: 100; margin-left: 3%;\">© {year} Beverly Ward, REALTOR® a Burke Real Estate Consultant California DRE#01992425</h4> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>"
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
    }
}
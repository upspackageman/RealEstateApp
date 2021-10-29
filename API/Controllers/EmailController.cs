using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Entities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController: BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> SendMail([FromBody]Email email)
        {
            var client = new System.Net.Mail.SmtpClient("smtp.example.com", 111);
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;

            client.Credentials = new System.Net.NetworkCredential("yourusername", "yourpassword");

            var mailMessage = new System.Net.Mail.MailMessage();
            mailMessage.From = new System.Net.Mail.MailAddress("youremail@example.com");

            mailMessage.To.Add(email.To);

            if (!string.IsNullOrEmpty(email.Cc))
            {
                mailMessage.CC.Add(email.Cc);
            }

            mailMessage.Body = email.Text;

            mailMessage.Subject = email.Subject;

            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;

            await client.SendMailAsync(mailMessage);

            return Ok();
        }
    }
}
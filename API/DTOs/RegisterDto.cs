using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
       
        [Required]
        public string Password {get;set;}
                    
        [Required]
        public string FirstName { get; set; }  

        [Required]
        public string LastName { get; set; }  

        [EmailAddress]
        public string Email { get; set; }

    }
}
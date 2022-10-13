using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
   
        public int Id {get;set;}

        [Required]
        [StringLength(20, MinimumLength =5)]        
        public string Password {get;set;}

        public string ConfirmPassword { get; set;}
        public string ClientURI { get; set; }
                    
        [Required]
        public string FirstName { get; set; }  

        [Required]
        public string LastName { get; set; }  

        [EmailAddress]
        public string Email { get; set; }

    }
}
namespace API.Entities
{
    public class CustomerUser
    {
       public int Id { get; set; }
       
       //email is username or login
       public string Email { get; set; }


       public string FirstName { get; set; }  

       public string LastName { get; set; }    

       public byte[] PasswordHash {get; set;}

       public byte[] PasswordSalt {get;set;}



    }
}
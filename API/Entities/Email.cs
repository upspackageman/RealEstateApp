namespace API.Entities
{
    public class Email
    {
        public string From { get; set; }
        public string Cc { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string Listing { get; set; }
        public string Text { get; set; }
        public string AgentEmail {get;set;} = "";
        public string AgentPhone {get;set;} = "";
        public string AgentName {get; set;} = "";
    }
}
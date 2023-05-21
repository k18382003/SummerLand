using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        // Add the additional property for the users' class
        public string displayName { get; set; }

        public string bio { get; set; }
    }
}

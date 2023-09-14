using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        // Add the additional property for the users' class
        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public ICollection<Followers> Followers { get; set; }

        public ICollection<Followers> Followees { get; set; }

        public ICollection<FavoriteArticles> FavoriteArticles { get; set; }

        public ICollection<Photos> Photos { get; set; }
    }
}

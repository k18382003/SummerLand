namespace Domain
{
    public class FavoriteArticles
    {
        public string UserId { get; set; }

        public Guid ArtID { get; set; }

        public AppUser AppUser { get; set; }

        public Articles Article { get; set; }
    }
}

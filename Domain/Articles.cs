using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Articles
    {
        [Key]
        public Guid ArtID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public string Category { get; set; }

        public string AuthorName { get; set; }

        public ICollection<FavoriteArticles> FavoriteBy { get; set; } = new List<FavoriteArticles>();
        public ICollection<Comments> Comments { get; set; } = new List<Comments>();
    }
}

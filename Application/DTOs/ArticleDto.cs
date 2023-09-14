
namespace Application.DTOs
{
    public class ArticleDto
    {
        public Guid ArtID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public string Category { get; set; }

        public string AuthorName { get; set; }

        public string AuthorPhoto { get; set; }

        public ICollection<FavoriteByDto> FavoriteBy { get; set; }
    }
}

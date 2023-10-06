using Application.Core;

namespace Application.Article
{
    public class ArticleParams: PagedParams
    {
        public bool MyFavorites { get; set; }
        public bool MyArticles { get; set; }
        public string SearchKeyWords { get; set; }
        public bool TopFive { get; set; }
        //public DateTime SearchDate { get; set; }
    }
}

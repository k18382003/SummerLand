using Application.Article;
using Application.Favorites;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FavoritesController : BaseAPIController
    {
        [HttpGet("{articleid}")]
        public async Task<IActionResult> Favorites(Guid ArticleID)
        {
            // Use Mediator to access application functions
            return ResponseHandler(await Mediator.Send(new FavoriteList.Query { ArtID = ArticleID }));
        }

        [HttpPut("{articleid}")]
        public async Task<IActionResult> EditFavorite(Guid ArticleID)
        {          
            // Use Mediator to access application functions
            return ResponseHandler(await Mediator.Send(new EditFavoriteArticles.Command { ArtID = ArticleID }));
        }

    }
}

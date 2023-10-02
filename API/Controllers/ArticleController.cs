
using Application.Article;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ArticleController : BaseAPIController
    {

        [HttpGet] //end point : api/articles
        public async Task<IActionResult> Articles([FromQuery] ArticleParams param)
        {
            // Use Mediator to access application functions
            return ResponsePageHeaderHandler(await Mediator.Send(new ArticleList.Query { param = param }));
        }

        [HttpGet("{articleid}")] //end point : api/articles/articleid
        public async Task<IActionResult> Articles(Guid ArticleID)
        {
            return ResponseHandler(await Mediator.Send(new ArticleDetail.Query { ArtcileID = ArticleID }));
        }

        [HttpPost]
        public async Task<IActionResult> AddArticles(Articles article)
        { 
            return ResponseHandler(await Mediator.Send(new AddArticle.Command { Article = article }));
        }

        // replacing existing value, we can use httpput
        [Authorize(policy: "IsAuthor")]
        [HttpPut("{articleid}")]
        public async Task<IActionResult> EditArticles(Guid ArticleID, Articles article)
        {
            // assigning artitcle ID to our Article objects
            article.ArtID = ArticleID;
            return ResponseHandler(await Mediator.Send(new EditAtricle.Command {ArtID = ArticleID, Article = article }));
        }

        [Authorize(policy: "IsAuthor")]
        [HttpDelete("{articleid}")]
        public async Task<IActionResult> DeleteArticle(Guid ArticleID)
        {
            return ResponseHandler(await Mediator.Send(new DeleteArticle.Command { ArtID = ArticleID }));   
        }

        [HttpPut("{articleid}/fav")]
        public async Task<IActionResult> EditFavorite(Guid ArticleID)
        {
            // Use Mediator to access application functions
            return ResponseHandler(await Mediator.Send(new EditFavoriteArticles.Command { ArtID = ArticleID }));
        }
    }
}

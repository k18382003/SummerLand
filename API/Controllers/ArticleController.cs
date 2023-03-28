﻿using Application.Article;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ArticleController : BaseAPIController
    {
        [HttpGet] //end point : api/articles
        public async Task<ActionResult<List<Articles>>> Articles()
        {
            // Use Mediator to access application functions
            return await Mediator.Send(new ArticleList.Query());
        }

        [HttpGet("{articleid}")] //end point : api/articles/articleid
        public async Task<ActionResult<Articles>> Articles(Guid ArticleID)
        {
            return await Mediator.Send(new ArticleDetail.Query { ArtcileID = ArticleID });
        }

        [HttpPost]
        public async Task<IActionResult> AddArticles(Articles article)
        { 
            return Ok(await Mediator.Send(new AddArticle.Command { Article = article }));
        }

        // replacing existing value, we can use httpput
        [HttpPut("{articleid}")]
        public async Task<IActionResult> EditArticles(Guid ArticleID, Articles article)
        {
            // assigning artitcle ID to our Article objects
            article.ArtID = ArticleID;
            return Ok(await Mediator.Send(new EditAtricle.Command {ArtID = ArticleID, Article = article }));
        }

        [HttpDelete("{articleid}")]
        public async Task<IActionResult> DeleteArticle(Guid ArticleID)
        {
            return Ok(await Mediator.Send(new DeleteArticle.Command { ArtID = ArticleID }));   
        }
    }
}

using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ArticleController : BaseAPIController
    {
        private readonly DataContext _Context;

        // Utilyze DI for accessing database
        public ArticleController(DataContext context)
        {
            _Context = context;
        }

        [HttpGet] //end point : api/articles
        public async Task<ActionResult<List<Articles>>> Articles()
        {
            return await _Context.Articles.ToListAsync();
        }

        [HttpGet("{artcileid}")] //end point : api/articles/articleid
        public async Task<ActionResult<Articles>> Articles(Guid ArtcileID)
        {
            return await _Context.Articles.FindAsync(ArtcileID);
        }
    }
}

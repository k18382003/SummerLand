using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;
using System.Security.Claims;

namespace Infrustructure.Security
{
    public class IsAuthorRequirement : IAuthorizationRequirement
    {
    }

    public class IsAuthorRequirementHandler : AuthorizationHandler<IsAuthorRequirement>
    {
        private readonly DataContext _DbContext;
        private readonly IHttpContextAccessor _HttpContextAccessor;

        public IsAuthorRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _DbContext = dbContext;
            _HttpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAuthorRequirement requirement)
        {
            var user = context.User.FindFirstValue(ClaimTypes.Name);

            if (user == null) return Task.CompletedTask;

            var articleID = Guid.Parse(_HttpContextAccessor.HttpContext.Request.RouteValues
                .FirstOrDefault(x => x.Key == "articleid").Value.ToString());

            var author = _DbContext.Articles.FindAsync(articleID).Result.AuthorName;

            if (author == null) return Task.CompletedTask;

            if (author != user) return Task.CompletedTask;

            if (author == user) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}

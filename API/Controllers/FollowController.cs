
using Application.Article;
using Application.Favorites;
using Application.Follower;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseAPIController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> UpdateFollow(string userName)
        {
            // Use Mediator to access application functions
            return ResponseHandler(await Mediator.Send(new FollowToggle.Command { userName = userName }));
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> ListFollow(string userName, string type)
        {
            // Use Mediator to access application functions
            return ResponseHandler(await Mediator.Send(new ListFollower.Query { userName = userName, type = type }));
        }

    }
}

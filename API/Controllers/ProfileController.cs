using API.DTOs;
using Application.Follower;
using Application.Profiles;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseAPIController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return ResponseHandler(await Mediator.Send(new ProfileDetail.Query { userName = username}));
        }

        [HttpPost("about")]
        public async Task<IActionResult> UpdateBio(BioDto bioDto)
        {
            return ResponseHandler(await Mediator.Send(new EditBio.Command { content = bioDto.bio, userName = bioDto.displayName}));
        }

        [HttpGet("article/{userName}")]
        public async Task<IActionResult> ListArticles(string userName)
        {
            return ResponseHandler(await Mediator.Send(new ListArticles.Query { userName = userName }));
        }
    }
}

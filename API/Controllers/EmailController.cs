using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Controllers
{
    public class EmailController : BaseAPIController
    {
        private readonly UserManager<AppUser> _UserManager;
        private readonly EmailService _EmailService;

        public EmailController(UserManager<AppUser> userManager, EmailService emailService)
        {
            _UserManager = userManager;
            _EmailService = emailService;
        }

        [AllowAnonymous]
        public async Task<IActionResult> EmailConfirm(string token, string email)
        {
            var user = await _UserManager.FindByEmailAsync(email);
            if (user == null)
                return Unauthorized();

            var result = await _UserManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
                return Redirect($"{Request.Scheme}://{Request.Host}/confirm-email");
            else
                return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<string>> ResendEmailConfirm(object request)
        {
            string JsonString = JsonSerializer.Serialize(request);
            string email = JsonSerializer.Deserialize<Dictionary<string, string>>(JsonString)["email"];

            var user = await _UserManager.FindByEmailAsync(email);
            if (user == null)
                return Unauthorized();


            var token = await _UserManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmLink = Url.Action("EmailConfirm", "Email", new { token, email = user.Email }, Request.Scheme);
            var confirmed = _EmailService.SendEmail(user.Email, confirmLink);

            if (!confirmed)
            {
                return Unauthorized("Email Not Confirmed");
            }

            return Ok(confirmed);
        }
    }
}

﻿using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _UserManager;
        private readonly TokenServices _Token;
        private readonly EmailService _EmailService;

        public AccountController(UserManager<AppUser> userManager, TokenServices token, EmailService emailService)
        {
            _UserManager = userManager;
            _Token = token;
            _EmailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _UserManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _UserManager.CheckPasswordAsync(user, loginDto.Password);
            
            var IsEmailConfirmed = await _UserManager.IsEmailConfirmedAsync(user);

            if (!IsEmailConfirmed)
                return new UserDto
                {
                    userName = user.UserName,
                    displayName = user.DisplayName,
                    emailConfirmed = false
                };

            if (result)
            {
                await SetRefreshToken(user);
                return createUserDto(user);                
            }
            
            return Unauthorized();
            
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto register)
        {
            if (await _UserManager.Users.AnyAsync(x => x.UserName == register.UserName))
            {
                ModelState.AddModelError("UserName", "This username is taken!");
                return ValidationProblem();
            }

            if (await _UserManager.Users.AnyAsync(x => x.Email == register.Email))
            {
                ModelState.AddModelError("Email", "This Email is taken!");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = register.DisplayName,
                Email = register.Email,
                UserName = register.UserName,
            };

            var result = await _UserManager.CreateAsync(user, register.Password);

            if (result.Succeeded)
            {
                var token = await _UserManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmLink = Url.Action("EmailConfirm", "Email", new {token, email = user.Email}, Request.Scheme);
                var confirmed = _EmailService.SendEmail(user.Email, confirmLink);

                if (!confirmed) 
                {
                    return BadRequest("Email Not Confirmed");
                }

                //Before generate jwt, generate refreshtoken first
                await SetRefreshToken(user);
                return createUserDto(user);
            }

            return BadRequest(result.Errors);
            
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _UserManager.Users.Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            await SetRefreshToken(user);
            return createUserDto(user);
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["RefreshToken"];
            var user = await _UserManager.Users.Include(r => r.refreshTokens)
                    .Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user == null) return Unauthorized();

            var oldToken = user.refreshTokens.FirstOrDefault(r => r.token == refreshToken);

            if (oldToken != null && !oldToken.isActive) return Unauthorized();

            return createUserDto(user);
        }


        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _Token.GenerateRefreshToken();
            user.refreshTokens.Add(refreshToken);
            await _UserManager.UpdateAsync(user);

            var cookieOption = new CookieOptions
            {
                // To avoid Cross-site Scripting attack (XSS)
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7) // Same as refresh token
            };

            // Return cookie from server to client
            Response.Cookies.Append("RefreshToken", refreshToken.token, cookieOption);
        }

        private UserDto createUserDto(AppUser user)
        {
            return new UserDto
            {
                displayName = user.DisplayName,
                image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                userName = user.UserName,
                token = _Token.CreateToken(user),
                emailConfirmed = true
            };
        }
    }   
}

using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        public AccountController(UserManager<AppUser> userManager, TokenServices token)
        {
            _UserManager = userManager;
            _Token = token;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _UserManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _UserManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
            {
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
                displayName = register.DisplayName,
                Email = register.Email,
                UserName = register.UserName,
            };

            var result = await _UserManager.CreateAsync(user, register.Password);

            if (result.Succeeded)
            {
                return createUserDto(user);
            }

            return BadRequest(result.Errors);
            
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _UserManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return createUserDto(user);
        }


        private UserDto createUserDto(AppUser user)
        {
            return new UserDto
            {
                displayName = user.displayName,
                image = null,
                userName = user.UserName,
                token = _Token.CreateToken(user),
            };
        }
    }   
}

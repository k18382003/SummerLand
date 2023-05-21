using Application.Core;
using Domain;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenServices
    {
        private readonly IConfiguration _Config;

        public TokenServices(IConfiguration config)
        {
            _Config = config;
        }


        // Create JWT token
        public string CreateToken(AppUser appUser)
        {
            // 1. set list of claim objects
            var claim = new List<Claim>
            {
                new Claim(ClaimTypes.Name, appUser.UserName),
                new Claim(ClaimTypes.Email, appUser.Email),
                new Claim(ClaimTypes.NameIdentifier, appUser.Id)
            };

            // 2. create symmetric key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Config["TokenKey"]));

            // 3. use key to generate signature(credential)
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // 4. Decribe the token use SecurityTokenDescriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}

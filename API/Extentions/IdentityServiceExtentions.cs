using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.ComponentModel;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace API.Extentions
{
    public static class IdentityServiceExtentions
    {
        public static IServiceCollection IdentityService(this IServiceCollection services, IConfiguration config) 
        {
            services.AddIdentityCore<AppUser>((opt) =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;

            }).AddEntityFrameworkStores<DataContext>();

            // the key must be the same as the key for decryption
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            // set the defaultsheme as JWTBearer authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = key,
                       // we don't validate issuer and audience for now
                       ValidateIssuer = false,
                       ValidateAudience = false
                    };
                });

            
            services.AddScoped<TokenServices>();

            return services;
        }
    }
}

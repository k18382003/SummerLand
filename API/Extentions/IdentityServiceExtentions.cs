using API.Services;
using Domain;
using Infrustructure.Security;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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

            }).AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();

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

                    opt.Events = new JwtBearerEvents()
                    {
                        OnMessageReceived = context =>
                        {
                            // Get a token from SignalR connection
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            // if the path is match to the SignalR path (which here is /chat)
                            // and then we add accessToken to the context
                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsAuthor", policy =>
                {
                    policy.Requirements.Add(new IsAuthorRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsAuthorRequirementHandler>();
            services.AddScoped<TokenServices>();

            return services;
        }
    }
}

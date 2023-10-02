using API.Services;
using Application.Article;
using Application.Core;
using Application.Interface;
using Application.Photos;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrustructure.Photos;
using Infrustructure.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Globalization;

namespace API.Extentions
{
    public static class AppServiceExtentions
    {
        public static IServiceCollection AppService(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();

            services.AddDbContext<DataContext>(opt =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                var conntr = "";

                if (env == "Development")
                {
                    conntr = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    // Use the connection string that provide at the runtime by Azure
                    conntr = Environment.GetEnvironmentVariable("AZURE_POSTGRESQL_CONNECTIONSTRING");
                }

                opt.UseNpgsql(conntr);

            });

            // Changing CORS policies, in order to let our web service to recieve data
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
                });
            });

            // add a mediator service
            // Need to sepcify which assembly we want to register
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<ArticleList>());

            // set the default message to English
            ValidatorOptions.Global.LanguageManager.Culture = new CultureInfo("en");

            // add a AutoMapper service
            services.AddAutoMapper(typeof(MappingProfile).Assembly);

            // add Validation serivce
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<AddArticle>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotos, PhotoAccessor>();
            services.AddScoped<EmailService>();
            services.Configure<IdentityOptions>(opt =>
            {
                opt.SignIn.RequireConfirmedEmail = true;
            });
            services.Configure<AzureSetting>(config.GetSection("AzureBlobStorage"));
            services.AddSignalR();

            return services;
        }
    }
}

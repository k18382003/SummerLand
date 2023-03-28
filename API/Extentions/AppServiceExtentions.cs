using Application.Article;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // Changing CORS policies, in order to let our web service to recieve data
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            // add a mediator service
            // Need to sepcify which assembly we want to register
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<ArticleList>());

            // add a AutoMapper service
            services.AddAutoMapper(typeof(EditAtricle).Assembly);

            return services;
        }
    }
}

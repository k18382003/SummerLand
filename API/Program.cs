using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using API.Extentions;
using API.Middlewares;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Creating an service extentions to add services to the container.(Can clean up Program.cs a bit)
builder.Services.AppService(builder.Configuration);
builder.Services.IdentityService(builder.Configuration);

// Apply the authentication policy to all the controllers
builder.Services.AddControllers(
    opt =>
    {
        var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        opt.Filters.Add(new AuthorizeFilter(policy));
    }
);

var app = builder.Build();

// Configure the HTTP request pipeline.
// Exception Middleware needs to be at the top of the request pipeline(Middleware tree)
app.UseMiddleware<ExceptionMiddleware>();

// It is important that UseCors must before UseAuthorization
app.UseCors("CorsPolicy");

// Authentication must before Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    // To update our database up to the latest
    await context.Database.MigrateAsync();
    // Implementing the seed data if there is no data in the db
    await Seed.SeedData(context, userManager);
}
catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Migrate error");
}

app.Run();

using API.Controllers;
using Application.Article;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using System.Reflection;
using API.Extentions;

var builder = WebApplication.CreateBuilder(args);

// Creating an service extentions to add services to the container.(Can clean up Program.cs a bit)
builder.Services.AppService(builder.Configuration);

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
// It is important that UseCors must before UseAuthorization
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services =scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    // To update our database up to the latest 
    await context.Database.MigrateAsync();
    // Implementing the seed data if there is no data in the db
    await Seed.SeedData(context);
}
catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Migrant error");
}

app.Run();

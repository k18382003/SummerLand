using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>()
                {
                    new AppUser(){displayName="Summer", UserName="summer", Email="summer@gmail.com" },
                    new AppUser(){displayName="Alice", UserName="alice", Email="alice@gmail.com" },
                    new AppUser(){displayName="Bob", UserName="bob", Email="bob@gmail.com" }
                };

                foreach (var user in users) 
                {
                    // Don't need to save change, CreateAsync will create and save at the same time
                    await userManager.CreateAsync(user, "Passw0rd");
                }
            }


            // if we have creating some new data, then just return
            if (context.Articles.Any()) return;

            // if we don't, then we use these demo data
            var articles = new List<Articles>()
            {
                new Articles()
                {
                    Title = "First day of learning code!",
                    CreateDate = DateTime.UtcNow.AddMonths(-2),
                    Category = "Others",
                    Content = "Hello welcome!"
                }
                ,new Articles()
                {
                    Title = "What should I choose ? VSCode or Visual Studio ?",
                    CreateDate = DateTime.UtcNow.AddMonths(-1),
                    Category = "Others",
                    Content = "To be launched"
                }
            };

            await context.AddRangeAsync(articles);
            await context.SaveChangesAsync();
        }
    }
}

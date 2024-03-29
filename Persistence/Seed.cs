﻿using Domain;
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
                    new AppUser(){DisplayName="Alice", UserName="alice", Email="alice@gmail.com" },
                    new AppUser(){DisplayName="Bob", UserName="bob", Email="bob@gmail.com" },
                    new AppUser(){DisplayName="Guest", UserName="guest", Email="example@example.com" }
                };

                foreach (var user in users)
                {
                    user.EmailConfirmed = true;
                    // Don't need to save change, CreateAsync will create and save at the same time
                    await userManager.CreateAsync(user, "P@ssw0rd");
                }

                if (!context.Articles.Any())
                {
                    var articles = new List<Articles>()
                    {
                        new Articles()
                        {
                            Title = "First day of learning code!(Dummy article 1)",
                            CreateDate = DateTime.UtcNow.AddMonths(-3),
                            Category = "Others",
                            Content = "Hello welcome! Enjoy the coding journey!",
                            AuthorName = users[0].UserName,
                            //AuthorPhoto = users[0].Photos.FirstOrDefault(x => x.IsMain).Url,
                            FavoriteBy = new List<Domain.FavoriteArticles>
                            {
                                new Domain.FavoriteArticles { AppUser = users[0] }
                            }
                        },
                        new Articles()
                        {
                            Title = "What should I choose ? VSCode or Visual Studio ?(Dummy article 2)",
                            CreateDate = DateTime.UtcNow.AddMonths(-1),
                            Category = "Others",
                            Content = "To be launched",
                            AuthorName = users[1].UserName,
                            FavoriteBy = new List<Domain.FavoriteArticles>
                            {
                                new Domain.FavoriteArticles { AppUser = users[1] }
                            }
                        },
                        new Articles()
                        {
                            Title = "Is React better? (Dummy article 3)",
                            CreateDate = DateTime.UtcNow.AddMonths(-1),
                            Category = "React",
                            Content = "To be launched",
                            AuthorName = users[1].UserName,
                            FavoriteBy = new List<Domain.FavoriteArticles>
                            {
                                new Domain.FavoriteArticles { AppUser = users[1] }
                            }
                        }
                    };

                    await context.AddRangeAsync(articles);
                    await context.SaveChangesAsync();
                }

            }
        }
    }
}

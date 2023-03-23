using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
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

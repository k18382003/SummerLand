using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        { 
        }

        public DbSet<Articles> Articles { get; set; }

        public DbSet<Followers> Followers { get; set; }

        public DbSet<FavoriteArticles> favorites { get; set; }

        public DbSet<Photos> Photos { get; set; }

        public DbSet<Comments> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<FavoriteArticles>(x => x.HasKey(f => new { f.ArtID, f.UserId }));

            builder.Entity<Followers>(x => 
                { x.HasKey(f => new { f.FollowerID, f.FolloweeID }); 
            
                x.HasOne(f => f.Follower)
                    .WithMany(f => f.Followees)
                    .HasForeignKey(f => f.FollowerID)
                    .OnDelete(DeleteBehavior.Cascade);

                x.HasOne(f => f.Followee)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(f => f.FolloweeID)
                    .OnDelete(DeleteBehavior.Cascade);

                });

            builder.Entity<FavoriteArticles>()
                .HasOne(x => x.Article)
                .WithMany(x => x.FavoriteBy)
                .HasForeignKey(x => x.ArtID)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<FavoriteArticles>()
                .HasOne(x => x.AppUser)
                .WithMany(x => x.FavoriteArticles)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Comments>()
                .HasOne(x => x.Article)
                .WithMany(x => x.Comments)
                .OnDelete(DeleteBehavior.Cascade);
                
        }

    }
}

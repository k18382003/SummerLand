using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography.X509Certificates;

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

            builder.Entity<Followers>(x => x.HasKey(f => new { f.FollowerID, f.FolloweeID }));
            builder.Entity<FavoriteArticles>(x => x.HasKey(f => new { f.ArtID, f.UserId }));
            
            builder.Entity<Followers>()
                .HasOne(x => x.Follower)
                .WithMany(x => x.Followees)
                .HasForeignKey(x => x.FollowerID)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Followers>()
                .HasOne(x => x.Followee)
                .WithMany(x => x.Followers)
                .HasForeignKey(x => x.FolloweeID)
                .OnDelete(DeleteBehavior.Restrict);

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

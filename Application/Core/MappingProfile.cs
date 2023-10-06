using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            string currentUsername = null;
            int articleCount = 0;

            // Create a mapping function that can auto mapping input fields to our class feilds.
            // CreateMap<TSource, TDestination>
            CreateMap<Articles, Articles>()
                .ForMember(des => des.FavoriteBy, act => act.Ignore());

            CreateMap<Articles, ArticleDto>();            

            CreateMap<AppUser, AuthorPhotoDto>()
                .ForMember(des => des.AuthorPhoto, opt => opt.MapFrom(sour => sour.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(des => des.AuthorName, opt => opt.MapFrom(sour => sour.UserName));

            CreateMap<FavoriteArticles, FavoriteByDto>()
                .ForMember(des => des.DisplayName, opt => opt.MapFrom(sour => sour.AppUser.DisplayName))
                .ForMember(des => des.UserName, opt => opt.MapFrom(sour => sour.AppUser.UserName))
                .ForMember(des => des.Bio, opt => opt.MapFrom(sour => sour.AppUser.Bio))
                .ForMember(des => des.Image, opt => opt.MapFrom(sour => sour.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(des => des.Image, opt => opt.MapFrom(sour => sour.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(des => des.Followers, opt => opt.MapFrom(sour => sour.Followers.Count))
                .ForMember(des => des.Followings, opt => opt.MapFrom(sour => sour.Followees.Count))
                .ForMember(des => des.Following, opt => opt.MapFrom(sour =>
                    sour.Followers.Any(x => x.Follower.UserName == currentUsername)));

            CreateMap<Domain.Comments, CommentDto>()
                .ForMember(des => des.DisplayName, opt => opt.MapFrom(sour => sour.Commenter.DisplayName))
                .ForMember(des => des.UserName, opt => opt.MapFrom(sour => sour.Commenter.UserName))
                .ForMember(des => des.Image, opt => opt.MapFrom(sour => sour.Commenter.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}

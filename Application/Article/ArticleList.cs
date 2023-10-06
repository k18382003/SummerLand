using Application.Core;
using Application.DTOs;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Article
{
    public class ArticleList
    {
        public class Query : IRequest<Response<PagedList<ArticleDto>>> 
        {
            public ArticleParams param { get; set; }
        }

        public class Handler : IRequestHandler<Query,Response<PagedList<ArticleDto>>>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;
            private readonly IMapper _Mapper;
            private readonly IUserAccessor _UserAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _Mapper = mapper;
                _UserAccessor = userAccessor;
            }

            public async Task<Response<PagedList<ArticleDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Eagerly loading
                //var articles1 = await _context.Articles
                //    .Include(f => f.FavoriteBy)
                //    .ThenInclude(a => a.AppUser)
                //    .ToListAsync(cancellationToken);

                //var articlesWithFav = _Mapper.Map<List<ArticleDto>>(articles1);


                //Projection loading(This will only query the columns we need, better sql, better performance)
                var articles = _context.Articles
                    .OrderBy(x => x.CreateDate)
                    .ProjectTo<ArticleDto>(_Mapper.ConfigurationProvider)
                    .AsQueryable();

                if (request.param.MyArticles && !request.param.MyFavorites && !request.param.TopFive)
                {
                    articles = articles.Where(x => x.AuthorName == _UserAccessor.GetUserName());
                }

                if (!request.param.MyArticles && request.param.MyFavorites && !request.param.TopFive)
                {
                    articles = articles.Where(x => x.FavoriteBy.Any(x => x.UserName == _UserAccessor.GetUserName()));
                }

                if (!request.param.MyArticles && !request.param.MyFavorites && request.param.TopFive)
                {
                    articles = articles.OrderByDescending(x => x.FavoriteBy.Count).Take(5);
                }

                if (!request.param.MyArticles && !request.param.MyFavorites && !string.IsNullOrEmpty(request.param.SearchKeyWords))
                {
                    articles = articles.Where(x => x.Title.ToLower().Contains(request.param.SearchKeyWords.ToLower()) ||
                                x.AuthorName.ToLower().Contains(request.param.SearchKeyWords.ToLower()) ||
                                x.Category.ToLower().Contains(request.param.SearchKeyWords.ToLower()));
                }

                var lstArticle = await PagedList<ArticleDto>.CreateAsync(articles, request.param.PageNumber
                        , request.param.PageSize);

                var photos = await _context.Users
                        .ProjectTo<AuthorPhotoDto>(_Mapper.ConfigurationProvider)
                        .ToListAsync();

                // Setting author photos
                lstArticle.ForEach(x => x.AuthorPhoto =
                    photos.Where(p => p.AuthorName == x.AuthorName)
                    .Select(p => p.AuthorPhoto).First());


                return Response<PagedList<ArticleDto>>.Success(lstArticle);
            }
        }
    }
}

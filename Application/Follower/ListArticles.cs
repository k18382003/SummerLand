using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Follower
{
    public class ListArticles
    {
        public class Query : IRequest<Response<List<ArticleDto>>>
        {
            public string userName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<List<ArticleDto>>>
        {
            private readonly DataContext _DataContext;
            private readonly IMapper _Mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _DataContext = dataContext;
                _Mapper = mapper;
            }

            public async Task<Response<List<ArticleDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var articles = await _DataContext.Articles.Where(x => x.AuthorName == request.userName)
                    .OrderByDescending(x => x.CreateDate)
                    .ProjectTo<ArticleDto>(_Mapper.ConfigurationProvider)
                    .ToListAsync();

                return Response<List<ArticleDto>>.Success(articles);
            }
        }
    }
}

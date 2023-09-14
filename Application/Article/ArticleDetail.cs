using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Article
{
    public class ArticleDetail
    {
        public class Query: IRequest<Response<ArticleDto>>
        {
            public Guid ArtcileID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<ArticleDto>>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;
            private readonly IMapper _Mapper;

            public Handler (DataContext context, IMapper mapper)
            {
                _context = context;
                _Mapper = mapper;
            }

            public async Task<Response<ArticleDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var atricle = await _context.Articles
                    .ProjectTo<ArticleDto>(_Mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.ArtID == request.ArtcileID);

                return Response<ArticleDto>.Success(atricle);
            }
        }
    }
}

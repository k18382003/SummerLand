using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Article
{
    public class ArticleList
    {
        public class Query : IRequest<Response<List<Articles>>> { }

        public class Handler : IRequestHandler<Query,Response<List<Articles>>>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Response<List<Articles>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Response<List<Articles>>.Success(await _context.Articles.ToListAsync());
            }

        }
    }
}

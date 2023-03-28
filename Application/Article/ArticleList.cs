using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Article
{
    public class ArticleList
    {
        public class Query : IRequest<List<Articles>> { }

        public class Handler : IRequestHandler<Query, List<Articles>>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Articles>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Articles.ToListAsync();
            }

        }
    }
}

using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Article
{
    public class ArticleDetail
    {
        public class Query: IRequest<Response<Articles>>
        {
            public Guid ArtcileID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<Articles>>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;
            public Handler (DataContext context)
            {
                _context = context;
            }

            public async Task<Response<Articles>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Response<Articles>.Success(await _context.Articles.FindAsync(request.ArtcileID));
            }
        }
    }
}

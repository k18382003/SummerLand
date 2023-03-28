using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Article
{
    public class ArticleDetail
    {
        public class Query: IRequest<Articles>
        {
            public Guid ArtcileID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Articles>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;
            public Handler (DataContext context)
            {
                _context = context;
            }

            public async Task<Articles> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Articles.FindAsync(request.ArtcileID);
            }
        }
    }
}

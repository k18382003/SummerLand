using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Favorites
{
    public class FavoriteList
    {
        public class Query : IRequest<Response<List<FavoriteArticles>>>
        {
            public Guid ArtID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<List<FavoriteArticles>>>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Response<List<FavoriteArticles>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = await _context.favorites.ToListAsync();
                var fileteredList = list.FindAll(x => x.ArtID == request.ArtID);

                return Response<List<FavoriteArticles>>.Success(fileteredList);
            }
        }
    }
}

using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Article
{
    public class DeleteArticle
    {
        public class Command: IRequest<Response<Unit>>
        {
            public Guid ArtID { get; set; }
        }

        public class Handler: IRequestHandler<Command, Response<Unit>>
        {
            private readonly DataContext _Context;
            private readonly IMapper _Mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _Context = context;
                _Mapper = mapper;
            }

            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var article = await _Context.Articles
                    .Include(f => f.FavoriteBy)
                    .FirstOrDefaultAsync(a => a.ArtID == request.ArtID);

                if (article == null) return null;
             
                var a = article.FavoriteBy.Count();
                article.FavoriteBy.Clear();
                _Context.Articles.Remove(article);

                var response = await _Context.SaveChangesAsync();

                if (response == 0)
                    return Response<Unit>.Failure("Unable to delete article");

                return Response<Unit>.Success(Unit.Value);
            }
        }
    }
}

using Application.Core;
using MediatR;
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

            public Handler(DataContext context)
            {
                _Context = context;
            }

            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var article = await _Context.Articles.FindAsync(request.ArtID);

                if (article == null) return null;

                _Context.Articles.Remove(article);

                var response = await _Context.SaveChangesAsync();

                if (response == 0)
                    return Response<Unit>.Failure("Unable to delete article");

                return Response<Unit>.Success(Unit.Value);
            }
        }
    }
}

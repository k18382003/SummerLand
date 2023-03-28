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
        public class Command: IRequest<Unit>
        {
            public Guid ArtID { get; set; }
        }

        public class Handler: IRequestHandler<Command, Unit>
        {
            private readonly DataContext _Context;

            public Handler(DataContext context)
            {
                _Context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var article = await _Context.Articles.FindAsync(request.ArtID);

                _Context.Articles.Remove(article);

                await _Context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}

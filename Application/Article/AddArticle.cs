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
    public class AddArticle
    {
        public class Command: IRequest<Unit>
        {
            public Articles Article { get; set; }
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
                // we'll firstly save the change to memory
                _Context.Articles.Add(request.Article);

                // and then save it to db
                await _Context.SaveChangesAsync();

                return Unit.Value;
            }
        }

    }
}

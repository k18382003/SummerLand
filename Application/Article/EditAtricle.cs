using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Article
{
    public class EditAtricle
    {
        public class Command : IRequest<Unit>
        {
            public Guid ArtID { get; set; }
            public Articles Article { get; set; }
        }

        public class Handler: IRequestHandler<Command, Unit>
        {
            private readonly DataContext _Context;
            private readonly IMapper _Mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _Context = context;
                _Mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // if we use FindAsync, we need to have await keyword, or program will keep running
                // without waiting for fetching the data from db
                var articles = await _Context.Articles.FindAsync(request.ArtID);

                // Automapper will matching and update our db feild and save in the memory
                _Mapper.Map(request.Article, articles);

                // update DB
                await _Context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}

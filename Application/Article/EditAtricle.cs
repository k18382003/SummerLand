using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Article
{
    public class EditAtricle
    {
        public class Command : IRequest<Response<Unit>>
        {
            public Guid ArtID { get; set; }
            public Articles Article { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Article).SetValidator(new ArticleValidators());
            }
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
                // if we use FindAsync, we need to have await keyword, or program will keep running
                // without waiting for fetching the data from db
                var articles = await _Context.Articles.FindAsync(request.ArtID);

                if (articles == null) return null;

                // Automapper will matching and update our db feild and save in the memory
                _Mapper.Map(request.Article, articles);

                // update DB
                var response = await _Context.SaveChangesAsync();

                if (response == 0)
                    return Response<Unit>.Failure("Unable to edit aritcle");

                return Response<Unit>.Success(Unit.Value);
            }
        }
    }
}

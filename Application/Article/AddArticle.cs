using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Article
{
    public class AddArticle
    {
        public class Command : IRequest<Response<Unit>>
        {
            public Articles Article { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Article).SetValidator(new ArticleValidators());
            }
        }

        public class Handler : IRequestHandler<Command, Response<Unit>>
        {
            private readonly DataContext _Context;
            public Handler(DataContext context)
            {
                _Context = context;
            }

            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // we'll firstly save the change to memory
                _Context.Articles.Add(request.Article);

                // and then save it to db
                var response = await _Context.SaveChangesAsync();

                // SaveChangesAsync will return number of state entries to the database
                // if not returning any entries means that create failed
                if (response == 0)
                    return Response<Unit>.Failure("Unable to save the article");

                return Response<Unit>.Success(Unit.Value);
            }
        }

    }
}

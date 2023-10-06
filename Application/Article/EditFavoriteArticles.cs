using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Persistence;

namespace Application.Article
{
    public class EditFavoriteArticles
    {
        public class Command : IRequest<Response<Unit>>
        {
            public Guid ArtID { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<Unit>>
        {
            private readonly DataContext _Context;
            private readonly IUserAccessor _UserAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _Context = context;
                _UserAccessor = userAccessor;
            }

            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _Context.Users.FirstOrDefault(x =>
                    x.UserName == _UserAccessor.GetUserName()
                ) ;

                if (user == null) return null;

                var article = await _Context.Articles.FindAsync(request.ArtID);

                if (article == null) return null;

                var fav = await _Context.favorites.FindAsync(request.ArtID, user.Id);

                if (fav == null)
                {
                    var Favorite = new FavoriteArticles
                    {
                        AppUser = user,
                        Article = article
                    };

                    // we'll firstly save the change to memory
                    _Context.favorites.Add(Favorite);
                }
                else
                {
                    // we'll firstly save the change to memory
                    _Context.favorites.Remove(fav);
                }

                // and then save it to db
                var response = await _Context.SaveChangesAsync();

                // SaveChangesAsync will return number of state entries to the database
                // if not returning any entries means that create failed
                if (response == 0)
                    return Response<Unit>.Failure("Unable to save the article as favorties");

                return Response<Unit>.Success(Unit.Value);
            }
        }
    }
}

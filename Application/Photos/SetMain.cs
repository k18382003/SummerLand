using Application.Core;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command:IRequest<Response<Unit>>
        {
            public string photoId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<Unit>>
        {
            private readonly DataContext _DataContext;
            private readonly IUserAccessor _User;

            public Handler(DataContext dataContext, IUserAccessor user)
            {
                _DataContext = dataContext;
                _User = user;
            }

            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _DataContext.Users.Include(x => x.Photos)
                    .FirstOrDefault(x => x.UserName == _User.GetUserName());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.photoId == request.photoId);
                if (photo == null) return null;

                var CurrentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);

                if (CurrentMainPhoto != null) CurrentMainPhoto.IsMain = false;
                            
                photo.IsMain = true;

                var result = await _DataContext.SaveChangesAsync();

                if (result == 0)
                    return Response<Unit>.Failure("Problem setting main photo");


                return Response<Unit>.Success(Unit.Value);
            }
        }
    }
}

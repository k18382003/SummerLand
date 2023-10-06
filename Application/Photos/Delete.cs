using Application.Core;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command: IRequest<Response<Unit>>
        {
            public string fileName { get; set; }
        }


        public class Handler : IRequestHandler<Command, Response<Unit>>
        {
            private readonly IPhotos _Photos;
            private readonly DataContext _DataContext;
            private readonly IUserAccessor _User;

            public Handler(IPhotos photos, DataContext dataContext, IUserAccessor user)
            {
                _Photos = photos;
                _DataContext = dataContext;
                _User = user;
            }

            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _DataContext.Users.Include(x => x.Photos)
                    .FirstOrDefault(x => x.UserName == _User.GetUserName());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.photoId == request.fileName);

                if (photo == null) return null;

                if (photo.IsMain) 
                    return Response<Unit>.Failure("You can not delete main photo");

                var result = await _Photos.DeletePhoto(request.fileName);

                if (!result)
                    return Response<Unit>.Failure("Problem deleting photos from Azure.");

                _DataContext.Photos.Remove(photo);

                var DbResult = await _DataContext.SaveChangesAsync();

                if (DbResult == 0)
                    return Response<Unit>.Failure("Problem deleting photos from API.");

                return Response<Unit>.Success(Unit.Value);
            }
        }
    }
}

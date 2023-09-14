using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Cryptography.X509Certificates;

namespace Application.Photos
{
    public class Upload
    {
        public class Command : IRequest<Response<PhotoUploadResult>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<PhotoUploadResult>>
        {
            private readonly IPhotos _Photos;
            private readonly IUserAccessor _User;
            private readonly DataContext _DataContext;

            public Handler(IPhotos photos, IUserAccessor user, DataContext dataContext)
            {
                _Photos = photos;
                _User = user;
                _DataContext = dataContext;
            }

            public async Task<Response<PhotoUploadResult>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Finding Current user's info (use eager loading to load photos)
                var user = await _DataContext.Users.Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _User.GetUserName());

                if (user == null) return null;

                // Add photo to cloud
                var response = await _Photos.UploadPhoto(request.File);

                if (response == null)
                    return Response<PhotoUploadResult>.Failure("Upload failed");

                // Check if user set any photo as main photo
                var ChkIsMain = !user.Photos.Any(x => x.IsMain);

                user.Photos.Add(new Domain.Photos
                {
                    photoId = response.Name,
                    Url = response.Uri,
                    IsMain = (ChkIsMain)
                }) ;

                var result = await _DataContext.SaveChangesAsync();

                if (result == 0)
                {
                    // Delete the photo from the cloud, in case the data in cloud and in DB is out of phase
                    await _Photos.DeletePhoto(response.Name);
                    return Response<PhotoUploadResult>.Failure("Save to DB failed");
                }

                response.IsMain = ChkIsMain;

                return Response<PhotoUploadResult>.Success(response);
            }
        }
    }
}

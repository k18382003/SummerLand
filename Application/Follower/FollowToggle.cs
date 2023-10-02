using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Follower
{
    public class FollowToggle
    {
        public class Command: IRequest<Response<Unit>>
        {
            public string userName { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<Unit>>
        {
            private readonly DataContext _DataContext;
            private readonly IUserAccessor _UserAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _DataContext = dataContext;
                _UserAccessor = userAccessor;
            }

            public async Task<Response<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var follower = await _DataContext.Users
                    .FirstOrDefaultAsync(x => x.UserName == _UserAccessor.GetUserName());

                if (follower == null) return null;

                var followee = await _DataContext.Users
                    .FirstOrDefaultAsync(x => x.UserName == request.userName);

                if (followee == null) return null;
                if (followee == follower) return null;

                var following = await _DataContext.Followers.FindAsync(follower.Id, followee.Id );


                if (following == null)
                {
                    following = new Followers
                    {
                        Followee = followee,
                        Follower = follower
                    };

                    _DataContext.Followers.Add(following);
                }
                else
                    _DataContext.Followers.Remove(following);

                var result = await _DataContext.SaveChangesAsync();

                if (result > 0)
                    return Response<Unit>.Success(Unit.Value);
                else
                    return Response<Unit>.Failure("Failed to follow or unfollow.");
            }
        }
    }
}

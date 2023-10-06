using Application.Core;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Follower
{
    public class EditBio
    {
        public class Command: IRequest<Response<Unit>>
        {
            public string userName { get; set; }

            public string content { get; set; }
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
                var user = await _DataContext.Users.FirstOrDefaultAsync(x => x.UserName == _UserAccessor.GetUserName());

                if (user == null) return null;

                user.Bio = request.content;

                _DataContext.Users.Update(user);

                var result = await _DataContext.SaveChangesAsync();

                if (result > 0)
                    return Response<Unit>.Success(Unit.Value);

                return Response<Unit>.Failure("Failed updating bio.");

            }
        }
    }
}

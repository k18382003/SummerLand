using Application.Core;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileDetail
    {
        public class Query : IRequest<Response<Profile>>
        {
            public string userName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<Profile>>
        {
            private readonly IUserAccessor _UserAccessor;
            private readonly DataContext _DataContext;
            private readonly IMapper _Mapper;

            public Handler(IUserAccessor userAccessor, DataContext dataContext, IMapper mapper)
            {
                _UserAccessor = userAccessor;
                _DataContext = dataContext;
                _Mapper = mapper;
            }

            public async Task<Response<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userProfile = await _DataContext.Users
                    .ProjectTo<Profile>(_Mapper.ConfigurationProvider)
                    .SingleAsync(x => x.UserName == request.userName);

                if (userProfile == null) return null;

                return Response<Profile>.Success(userProfile);
            }
        }
    }
}

using Application.Core;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Follower
{
    public class ListFollower
    {
        public class Query:IRequest<Response<List<Profiles.Profile>>>
        {
            public string type { get; set; }
            public string userName { get; set; }
        }

        public class Hnadler : IRequestHandler<Query, Response<List<Profiles.Profile>>>
        {
            private readonly DataContext _DataContext;
            private readonly IMapper _Mapper;
            private readonly IUserAccessor _UserAccessor;

            public Hnadler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _DataContext = dataContext;
                _Mapper = mapper;
                _UserAccessor = userAccessor;
            }

            public async Task<Response<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var lstProfile = new List<Profiles.Profile>();
                
                switch (request.type)
                {
                    case "following":
                        lstProfile = await _DataContext.Followers.Where(x => x.Follower.UserName == request.userName)
                            .Select(x => x.Followee)
                            //AutoMapper PojectTo can take two parameters: Configuration and parameters
                            //that need to be passed to configuration
                            .ProjectTo<Profiles.Profile>(_Mapper.ConfigurationProvider,
                            new { currentUsername = _UserAccessor.GetUserName() }).ToListAsync();

                        break;
                    case "followers":
                        lstProfile = await _DataContext.Followers.Where(x => x.Followee.UserName == request.userName)
                            .Select(x => x.Follower)
                            //AutoMapper PojectTo can take two parameters: Configuration and parameters
                            //that need to be passed to configuration
                            .ProjectTo<Profiles.Profile>(_Mapper.ConfigurationProvider,
                            new { currentUsername = _UserAccessor.GetUserName() }).ToListAsync();
                        break;
                }


                return Response<List<Profiles.Profile>>.Success(lstProfile);
            }
        }
    }
}

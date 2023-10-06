using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query: IRequest<Response<List<CommentDto>>>
        {
            public Guid ArtID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<List<CommentDto>>>
        {
            private readonly DataContext _DataContext;
            private readonly IMapper _Mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _DataContext = dataContext;
                _Mapper = mapper;
            }

            public async Task<Response<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _DataContext.Comments
                    .Where(x => x.Article.ArtID == request.ArtID)
                    .OrderBy(x => x.CreateTime)
                    .ProjectTo<CommentDto>(_Mapper.ConfigurationProvider)
                    .ToListAsync();
                    
                return Response<List<CommentDto>>.Success(comments);
            }
        }
    }
}

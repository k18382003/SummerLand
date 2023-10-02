using Application.Core;
using Application.DTOs;
using Application.Interface;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class Delete
    {
        public class Command : IRequest<Response<CommentDto>>
        {
            public Guid ArtId { get; set; }
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<CommentDto>>
        {
            private readonly IMapper _Mapper;
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _User;

            public Handler(DataContext dataContext, IUserAccessor user, IMapper mapper)
            {
                _Mapper = mapper;
                _dataContext = dataContext;
                _User = user;
            }

            public async Task<Response<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var comment = await _dataContext.Comments.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (comment == null) return null;

                // Can not delete other user's comments

                var user = await _dataContext.Users
                    .Include(x => x.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _User.GetUserName());

                if (_User.GetUserName() != user.UserName) return null;

                comment.Commenter = user;


                var commentDto = _Mapper.Map<CommentDto>(comment);

                _dataContext.Comments.Remove(comment);

                var result = await _dataContext.SaveChangesAsync();

                if (result > 0)
                    return Response<CommentDto>.Success(commentDto);

                return Response<CommentDto>.Failure("Failed to delete a comment.");
            }
        }
    }
}

using Application.Core;
using Application.DTOs;
using Application.Interface;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Cryptography.X509Certificates;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Response<CommentDto>>
        {
            public Guid ArtId { get; set; }
            public string Body { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator() 
            {
                RuleFor(x => x.Body != string.Empty);
            }
        }

        public class Handler : IRequestHandler<Command, Response<CommentDto>>
        {
            private readonly IMapper _Mapper;
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _user;

            public Handler(DataContext dataContext, IUserAccessor user, IMapper mapper)
            {
                _Mapper = mapper;
                _dataContext = dataContext;
                _user = user;
            }

            public async Task<Response<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var article = await _dataContext.Articles.FindAsync(request.ArtId);

                if (article == null) return null;

                var user = await _dataContext.Users
                    .Include(x => x.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _user.GetUserName());

                if (user == null) return null;

                var comment = new Domain.Comments
                {
                    Article = article,
                    Commenter = user,
                    Body = request.Body,
                };

                _dataContext.Comments.Add(comment);

                var result = await _dataContext.SaveChangesAsync();

                if (result > 0)
                    return Response<CommentDto>.Success(_Mapper.Map<CommentDto>(comment));

                return Response<CommentDto>.Failure("Failed to create a comment.");


                
            }
        }
    }
}

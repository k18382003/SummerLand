using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace Application.Article
{
    public class ArticleList
    {
        public class Query : IRequest<Response<List<ArticleDto>>> { }

        public class Handler : IRequestHandler<Query,Response<List<ArticleDto>>>
        {
            // Utilyze DI for accessing database
            private readonly DataContext _context;
            private readonly IMapper _Mapper;


            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _Mapper = mapper;
            }

            public async Task<Response<List<ArticleDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Eagerly loading
                //var articles1 = await _context.Articles
                //    .Include(f => f.FavoriteBy)
                //    .ThenInclude(a => a.AppUser)
                //    .ToListAsync(cancellationToken);

                //var articlesWithFav = _Mapper.Map<List<ArticleDto>>(articles1);

                //Projection loading(This will only query the columns we need, better sql, better performance)
                var articles = await _context.Articles
                    .ProjectTo<ArticleDto>(_Mapper.ConfigurationProvider)
                    .ToListAsync();

                var photos = await _context.Users
                    .ProjectTo<ArticleDto>(_Mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                // Setting author photos
                articles.ForEach(x => x.AuthorPhoto =
                photos.Where(p => p.AuthorName == x.AuthorName)
                .Select(a => a.AuthorPhoto).First());
                                                       
                return Response<List<ArticleDto>>.Success(articles);
            }
        }
    }
}

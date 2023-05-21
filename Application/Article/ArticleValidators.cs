using Domain;
using FluentValidation;

namespace Application.Article
{
    public class ArticleValidators : AbstractValidator<Articles>
    {
        public ArticleValidators() 
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }
    }
}

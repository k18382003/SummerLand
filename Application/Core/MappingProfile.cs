using AutoMapper;
using Domain;

namespace Application.Core
{
    internal class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Create a mapping function that can auto mapping input fields to our class feilds.
            // CreateMap<TSource, TDestination>
            CreateMap<Articles, Articles>();
        }
    }
}

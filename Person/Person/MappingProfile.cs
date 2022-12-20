using AutoMapper;
using Person.Dtos;

namespace Person
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Person
            CreateMap<Entities.Person, PersonRes>();
            CreateMap<PersonReqEdit, Entities.Person>();
        }
    }
}

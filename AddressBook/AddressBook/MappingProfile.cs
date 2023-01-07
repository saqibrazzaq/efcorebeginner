using AddressBook.Dtos;
using AddressBook.Entities;
using AutoMapper;

namespace AddressBook
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Country
            CreateMap<Country, CountryRes>();
            CreateMap<CountryReqEdit, Country>();

            // State
            CreateMap<State, StateRes>();
            CreateMap<StateReqEdit, State>();

            // City
            CreateMap<City, CityRes>();
            CreateMap<CityReqEdit, City>();

            // Timezone
            CreateMap<Timezone, TimezoneRes>();
            CreateMap<TimezoneReqEdit, Timezone>();

            // Translation
            CreateMap<Translation, TranslationRes>();
            CreateMap<TranslationReqEdit, Translation>();
        }
    }
}

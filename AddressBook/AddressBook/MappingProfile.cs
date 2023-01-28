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

            // Person
            CreateMap<Person, PersonRes>();
            CreateMap<PersonReqEdit, Person>();

            // Label
            CreateMap<Label, LabelRes>();
            CreateMap<LabelReqEdit, Label>();

            // PersonLabel
            CreateMap<PersonLabel, PersonLabelRes>();
            CreateMap<PersonLabelReqEdit, PersonLabel>();

            // PersonEmail
            CreateMap<PersonEmail, PersonEmailRes>();
            CreateMap<PersonEmailReqEdit, PersonEmail>();

            // EmailLabel
            CreateMap<EmailLabel, EmailLabelRes>();
            CreateMap<EmailLabelReqEdit, EmailLabel>();

            // PersonPhone
            CreateMap<PersonPhone, PersonPhoneRes>();
            CreateMap<PersonPhoneReqEdit, PersonPhone>();

            // PhoneLabel
            CreateMap<PhoneLabel,PhoneLabelRes>();
            CreateMap<PhoneLabelReqEdit, PhoneLabel>();

            // PersonAddress
            CreateMap<PersonAddress, PersonAddressRes>();
            CreateMap<PersonAddressReqEdit, PersonAddress>();

            // AddressLabel
            CreateMap<AddressLabel, AddressLabelRes>();
            CreateMap<AddressLabelReqEdit, AddressLabel>();

            // PersonWebsite
            CreateMap<PersonWebsite, PersonWebsiteRes>();
            CreateMap<PersonWebsiteReqEdit, PersonWebsite>();

            // WebsiteLabel
            CreateMap<WebsiteLabel, WebsiteLabelRes>();
            CreateMap<WebsiteLabelReqEdit, WebsiteLabel>();

            // PersonChat
            CreateMap<PersonChat, PersonChatRes>();
            CreateMap<PersonChatReqEdit, PersonChat>();

            // ChatLabel
            CreateMap<ChatLabel, ChatLabelRes>();
            CreateMap<ChatLabelReqEdit, ChatLabel>();
        }
    }
}

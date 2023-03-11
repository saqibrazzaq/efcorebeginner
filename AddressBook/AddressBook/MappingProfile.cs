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

            // Contact
            CreateMap<Contact, ContactRes>();
            CreateMap<ContactReqEdit, Contact>();

            // Label
            CreateMap<Label, LabelRes>();
            CreateMap<LabelReqEdit, Label>();

            // ContactLabel
            CreateMap<ContactLabel, ContactLabelRes>();
            CreateMap<ContactLabelReqEdit, ContactLabel>();

            // ContactEmail
            CreateMap<ContactEmail, ContactEmailRes>();
            CreateMap<ContactEmailReqEdit, ContactEmail>();

            // EmailLabel
            CreateMap<EmailLabel, EmailLabelRes>();
            CreateMap<EmailLabelReqEdit, EmailLabel>();

            // ContactPhone
            CreateMap<ContactPhone, ContactPhoneRes>();
            CreateMap<ContactPhoneReqEdit, ContactPhone>();

            // PhoneLabel
            CreateMap<PhoneLabel,PhoneLabelRes>();
            CreateMap<PhoneLabelReqEdit, PhoneLabel>();

            // ContactAddress
            CreateMap<ContactAddress, ContactAddressRes>();
            CreateMap<ContactAddressReqEdit, ContactAddress>();

            // AddressLabel
            CreateMap<AddressLabel, AddressLabelRes>();
            CreateMap<AddressLabelReqEdit, AddressLabel>();

            // ContactWebsite
            CreateMap<ContactWebsite, ContactWebsiteRes>();
            CreateMap<ContactWebsiteReqEdit, ContactWebsite>();

            // WebsiteLabel
            CreateMap<WebsiteLabel, WebsiteLabelRes>();
            CreateMap<WebsiteLabelReqEdit, WebsiteLabel>();

            // ContactChat
            CreateMap<ContactChat, ContactChatRes>();
            CreateMap<ContactChatReqEdit, ContactChat>();

            // ChatLabel
            CreateMap<ChatLabel, ChatLabelRes>();
            CreateMap<ChatLabelReqEdit, ChatLabel>();

            // City, State, Country import
            CreateMap<CityImport, City>()
                .ForMember(dst => dst.Latitude, opt => opt.MapFrom(src => double.Parse(src.latitude)))
                .ForMember(dst => dst.Longitude, opt => opt.MapFrom(src => double.Parse(src.longitude)))
                .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.name));
            CreateMap<StateImport, State>()
                .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.name))
                .ForMember(dst => dst.Code, opt => opt.MapFrom(src => src.state_code))
                .ForMember(dst => dst.Latitude, opt => opt.MapFrom(src => double.Parse(src.latitude)))
                .ForMember(dst => dst.Longitude, opt => opt.MapFrom(src => double.Parse(src.longitude)))
                .ForMember(dst => dst.Cities, opt => opt.MapFrom(src => src.cities));
            CreateMap<CountryImport, Country>()
                .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.name))
                .ForMember(dst => dst.Iso3, opt => opt.MapFrom(src => src.iso3))
                .ForMember(dst => dst.iso2, opt => opt.MapFrom(src => src.iso2))
                .ForMember(dst => dst.NumericCode, opt => opt.MapFrom(src => src.numeric_code))
                .ForMember(dst => dst.PhoneCode, opt => opt.MapFrom(src => src.phone_code))
                .ForMember(dst => dst.Capital, opt => opt.MapFrom(src => src.capital))
                .ForMember(dst => dst.Currency, opt => opt.MapFrom(src => src.currency))
                .ForMember(dst => dst.CurrencyName, opt => opt.MapFrom(src => src.currency_name))
                .ForMember(dst => dst.CurrencySymbol, opt => opt.MapFrom(src => src.currency_symbol))
                .ForMember(dst => dst.Tld, opt => opt.MapFrom(src => src.tld))
                .ForMember(dst => dst.Native, opt => opt.MapFrom(src => src.native))
                .ForMember(dst => dst.Region, opt => opt.MapFrom(src => src.region))
                .ForMember(dst => dst.SubRegion, opt => opt.MapFrom(src => src.subregion))
                .ForMember(dst => dst.Latitude, opt => opt.MapFrom(src => double.Parse(src.latitude)))
                .ForMember(dst => dst.Longitude, opt => opt.MapFrom(src => double.Parse(src.longitude)))
                .ForMember(dst => dst.Emoji, opt => opt.MapFrom(src => src.emoji))
                .ForMember(dst => dst.EmojiU, opt => opt.MapFrom(src => src.emojiU))
                .ForMember(dst => dst.States, opt => opt.MapFrom(src => src.states))
                .ForMember(dst => dst.Timezones, opt => opt.MapFrom(src => src.timezones));
            CreateMap<TimezoneImport, Timezone>()
                .ForMember(dst => dst.CityName, opt => opt.MapFrom(src => src.zoneName))
                .ForMember(dst => dst.GmtOffset, opt => opt.MapFrom(src => src.gmtOffset))
                .ForMember(dst => dst.GmtOffsetName, opt => opt.MapFrom(src => src.gmtOffsetName))
                .ForMember(dst => dst.Abbreviation, opt => opt.MapFrom(src => src.abbreviation))
                .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.tzName));
        }
    }
}

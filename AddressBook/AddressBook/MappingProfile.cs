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
        }
    }
}

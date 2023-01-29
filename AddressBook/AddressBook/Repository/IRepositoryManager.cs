namespace AddressBook.Repository
{
    public interface IRepositoryManager
    {
        ICountryRepository CountryRepository { get; }
        IStateRepository StateRepository { get; }
        ICityRepository CityRepository { get; }
        ITranslationRepository TranslationRepository { get; }
        ITimezoneRepository TimezoneRepository { get; }
        IContactRepository ContactRepository { get; }
        ILabelRepository LabelRepository { get; }
        IContactLabelRepository ContactLabelRepository { get; }
        IContactEmailRepository ContactEmailRepository { get; }
        IEmailLabelRepository EmailLabelRepository { get; }
        IContactPhoneRepository ContactPhoneRepository { get; }
        IPhoneLabelRepository PhoneLabelRepository { get; }
        IContactAddressRepository ContactAddressRepository { get; }
        IAddressLabelRepository AddressLabelRepository { get; }
        IContactWebsiteRepository ContactWebsiteRepository { get; }
        IWebsiteLabelRepository WebsiteLabelRepository { get; }
        IContactChatRepository ContactChatRepository { get; }
        IChatLabelRepository ChatLabelRepository { get; }
        void Save();
    }
}

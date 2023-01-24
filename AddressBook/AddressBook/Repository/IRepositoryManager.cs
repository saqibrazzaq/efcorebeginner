namespace AddressBook.Repository
{
    public interface IRepositoryManager
    {
        ICountryRepository CountryRepository { get; }
        IStateRepository StateRepository { get; }
        ICityRepository CityRepository { get; }
        ITranslationRepository TranslationRepository { get; }
        ITimezoneRepository TimezoneRepository { get; }
        IPersonRepository PersonRepository { get; }
        IPersonLabelRepository PersonLabelRepository { get; }
        IPersonEmailRepository PersonEmailRepository { get; }
        IEmailLabelRepository EmailLabelRepository { get; }
        IPersonPhoneRepository PersonPhoneRepository { get; }
        IPhoneLabelRepository PhoneLabelRepository { get; }
        IPersonAddressRepository PersonAddressRepository { get; }
        IAddressLabelRepository AddressLabelRepository { get; }
        IPersonWebsiteRepository PersonWebsiteRepository { get; }
        IWebsiteLabelRepository WebsiteLabelRepository { get; }
        IPersonChatRepository PersonChatRepository { get; }
        IChatLabelRepository ChatLabelRepository { get; }
        void Save();
    }
}

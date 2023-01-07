namespace AddressBook.Repository
{
    public interface IRepositoryManager
    {
        ICountryRepository CountryRepository { get; }
        IStateRepository StateRepository { get; }
        ICityRepository CityRepository { get; }
        ITranslationRepository TranslationRepository { get; }
        ITimezoneRepository TimezoneRepository { get; }
        void Save();
    }
}

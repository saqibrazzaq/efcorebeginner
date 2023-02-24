namespace AddressBook.Services
{
    public interface IDataResetService
    {
        void DeleteAllData();
        void AddCountriesData();
        void AddContactsData();
    }
}

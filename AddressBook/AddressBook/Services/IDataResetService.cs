namespace AddressBook.Services
{
    public interface IDataResetService
    {
        void DeleteCountries();
        void DeleteContacts();
        void DeleteContactLabels();
        void DeleteContactEmails();
        void DeleteContactPhones();
        void DeleteContactAddresses();
        void DeleteContactWebsites();
        void DeleteContactChats();
        void DeleteLabels();
        void AddCountriesData();
        void AddContactsData();
    }
}

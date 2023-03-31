using AddressBook.Entities;

namespace AddressBook.Services
{
    public interface IRandomDataGenerator
    {
        IEnumerable<Contact> GenerateContacts(int number);
        IEnumerable<Label> GenerateLabels();
        IEnumerable<EmailLabel> GenerateEmailLabels();
        IEnumerable<PhoneLabel> GeneratePhoneLabels();
        IEnumerable<AddressLabel> GenerateAddressLabels();
        IEnumerable<WebsiteLabel> GenerateWebsiteLabels();
        IEnumerable<ChatLabel> GenerateChatLabels();
    }
}

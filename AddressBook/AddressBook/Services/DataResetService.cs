using AddressBook.Repository;

namespace AddressBook.Services
{
    public class DataResetService : IDataResetService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IRandomDataGenerator _randomDataGenerator;

        public DataResetService(IRepositoryManager repositoryManager, 
            IRandomDataGenerator randomDataGenerator)
        {
            _repositoryManager = repositoryManager;
            _randomDataGenerator = randomDataGenerator;
        }

        public void ResetAllData()
        {
            // Delete data
            DeleteContacts();
            DeleteLabels();
            DeleteEmailLabels();
            DeletePhoneLabels();
            DeleteAddressLabels();
            DeleteWebsiteLabels();
            DeleteChatLabels();

            // Generate data
            AddLabels();
            AddEmailLabels();
            AddPhoneLabels();
            AddAddressLabels();
            AddWebsiteLabels();
            AddChatLabels();
            AddContacts();
        }

        private void AddChatLabels()
        {
            var chatLabels = _randomDataGenerator.GenerateChatLabels();
            _repositoryManager.ChatLabelRepository.CreateMany(chatLabels);
            _repositoryManager.Save();
        }

        private void AddWebsiteLabels()
        {
            var websiteLabels = _randomDataGenerator.GenerateWebsiteLabels();
            _repositoryManager.WebsiteLabelRepository.CreateMany(websiteLabels);
            _repositoryManager.Save();
        }

        private void AddAddressLabels()
        {
            var addressLabels = _randomDataGenerator.GenerateAddressLabels();
            _repositoryManager.AddressLabelRepository.CreateMany(addressLabels);
            _repositoryManager.Save();
        }

        private void AddPhoneLabels()
        {
            var phoneLabels = _randomDataGenerator.GeneratePhoneLabels();
            _repositoryManager.PhoneLabelRepository.CreateMany(phoneLabels);
            _repositoryManager.Save();
        }

        private void AddEmailLabels()
        {
            var emailLabels = _randomDataGenerator.GenerateEmailLabels();
            _repositoryManager.EmailLabelRepository.CreateMany(emailLabels);
            _repositoryManager.Save();
        }

        private void DeleteChatLabels()
        {
            var chatLabels = _repositoryManager.ChatLabelRepository.FindAll(true);
            _repositoryManager.ChatLabelRepository.DeleteMany(chatLabels);
            _repositoryManager.Save();
        }

        private void DeleteWebsiteLabels()
        {
            var websiteLabels = _repositoryManager.WebsiteLabelRepository.FindAll(true);
            _repositoryManager.WebsiteLabelRepository.DeleteMany(websiteLabels);
            _repositoryManager.Save();
        }

        private void DeleteAddressLabels()
        {
            var addressLabels = _repositoryManager.AddressLabelRepository.FindAll(true);
            _repositoryManager.AddressLabelRepository.DeleteMany(addressLabels);
            _repositoryManager.Save();
        }

        private void DeletePhoneLabels()
        {
            var phoneLabels = _repositoryManager.PhoneLabelRepository.FindAll(true);
            _repositoryManager.PhoneLabelRepository.DeleteMany(phoneLabels);
            _repositoryManager.Save();
        }

        private void DeleteEmailLabels()
        {
            var emailLabels = _repositoryManager.EmailLabelRepository.FindAll(true);
            _repositoryManager.EmailLabelRepository.DeleteMany(emailLabels);
            _repositoryManager.Save();
        }

        private void AddLabels()
        {
            var labels = _randomDataGenerator.GenerateLabels();
            _repositoryManager.LabelRepository.CreateMany(labels);
            _repositoryManager.Save();
        }

        private void DeleteLabels()
        {
            var allLabels = _repositoryManager.LabelRepository.FindAll(true);
            _repositoryManager.LabelRepository.DeleteMany(allLabels);
            _repositoryManager.Save();
        }

        private void AddContacts()
        {
            var contacts = _randomDataGenerator.GenerateContacts(50);
            _repositoryManager.ContactRepository.CreateMany(contacts);
            _repositoryManager.Save();
        }

        private void DeleteContacts()
        {
            var allContacts = _repositoryManager.ContactRepository.FindAll(true);
            _repositoryManager.ContactRepository.DeleteMany(allContacts);
            _repositoryManager.Save();
        }
    }
}

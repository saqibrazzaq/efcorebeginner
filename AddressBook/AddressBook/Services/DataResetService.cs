using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using System.Text.Json;

namespace AddressBook.Services
{
    public class DataResetService : IDataResetService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IRandomDataGenerator _randomDataGenerator;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IMapper _mapper;

        public DataResetService(IRepositoryManager repositoryManager,
            IRandomDataGenerator randomDataGenerator,
            IWebHostEnvironment webHostEnvironment,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _randomDataGenerator = randomDataGenerator;
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
        }

        public void DeleteAllData()
        {
            DeleteContacts();
            DeleteLabels();
            DeleteEmailLabels();
            DeletePhoneLabels();
            DeleteAddressLabels();
            DeleteWebsiteLabels();
            DeleteChatLabels();

            DeleteCities();
            DeleteStates();
            DeleteTimezones();
            DeleteTranslations();
            DeleteCountries();
        }

        public void AddCountriesData()
        {
            var countries = ReadCountriesFromJson();
            foreach (var country in countries)
            {
                _repositoryManager.CountryRepository.Create(country);
            }
            _repositoryManager.Save();
        }

        public void AddContactsData()
        {
            AddLabels();
            AddEmailLabels();
            AddPhoneLabels();
            AddAddressLabels();
            AddWebsiteLabels();
            AddChatLabels();
            AddContacts();
        }

        private IEnumerable<Country> ReadCountriesFromJson()
        {
            var rootPath = _webHostEnvironment.ContentRootPath;
            var jsonFilePath = Path.Combine(rootPath, "ImportData", "countries+states+cities.json");
            var jsonData = File.ReadAllText(jsonFilePath);
            var countriesImport = JsonSerializer.Deserialize<IEnumerable<CountryImport>>(jsonData);
            var countries = _mapper.Map<IEnumerable<Country>>(countriesImport);
            return countries;
        }

        private void DeleteCountries()
        {
            var countries = _repositoryManager.CountryRepository.FindAll(true);
            _repositoryManager.CountryRepository.DeleteMany(countries);
            _repositoryManager.Save();
        }

        private void DeleteTranslations()
        {
            var translations = _repositoryManager.TranslationRepository.FindAll(true);
            _repositoryManager.TranslationRepository.DeleteMany(translations);
            _repositoryManager.Save();
        }

        private void DeleteTimezones()
        {
            var timezones = _repositoryManager.TimezoneRepository.FindAll(true);
            _repositoryManager.TimezoneRepository.DeleteMany(timezones);
            _repositoryManager.Save();
        }

        private void DeleteStates()
        {
            var states = _repositoryManager.StateRepository.FindAll(true);
            _repositoryManager.StateRepository.DeleteMany(states);
            _repositoryManager.Save();
        }

        private void DeleteCities()
        {
            var cities = _repositoryManager.CityRepository.FindAll(true);
            _repositoryManager.CityRepository.DeleteMany(cities);
            _repositoryManager.Save();
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

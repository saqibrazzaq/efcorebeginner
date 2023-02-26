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
            ValidationForAddingCountries();

            var countries = ReadCountriesFromJson();
            foreach (var country in countries)
            {
                _repositoryManager.CountryRepository.Create(country);
            }
            _repositoryManager.Save();
        }

        private void ValidationForAddingCountries()
        {
            bool anyCountry = _repositoryManager.CountryRepository.FindAll(false).Any();
            if (anyCountry) throw new Exception("Please delete all countries before creating default countries.");

            bool anyState = _repositoryManager.StateRepository.FindAll(false).Any();
            if (anyState) throw new Exception("Please delete all states before creating default states.");

            bool anyCity = _repositoryManager.CityRepository.FindAll(false).Any();
            if (anyCity) throw new Exception("Please delete all cities before creating default cities.");
        }

        public void AddContactsData()
        {
            ValidationForAddingContacts();

            AddLabels();
            AddEmailLabels();
            AddPhoneLabels();
            AddAddressLabels();
            AddWebsiteLabels();
            AddChatLabels();
            AddContacts();
        }

        private void ValidationForAddingContacts()
        {
            bool anyContact = _repositoryManager.ContactRepository.FindAll(false).Any();
            if (anyContact) throw new Exception("Contacts already exist. Please delete all data before creating default contacts.");

            bool anyLabel = _repositoryManager.LabelRepository.FindAll(false).Any();
            if (anyLabel) throw new Exception("Please delete all labels before creating default contacts.");

            bool anyEmailLabel = _repositoryManager.EmailLabelRepository.FindAll(false).Any();
            if (anyEmailLabel) throw new Exception("Please delete all email labels before creating default contacts.");

            bool anyPhoneLabel = _repositoryManager.PhoneLabelRepository.FindAll(false).Any();
            if (anyPhoneLabel) throw new Exception("Please delete all phone labels before creating default contacts.");

            bool anyAddressLabel = _repositoryManager.AddressLabelRepository.FindAll(false).Any();
            if (anyAddressLabel) throw new Exception("Please delete all address labels before creating default contacts.");

            bool anyChatLabel = _repositoryManager.ChatLabelRepository.FindAll(false).Any();
            if (anyChatLabel) throw new Exception("Please delete all chat labels before creating default contacts.");

            bool anyCity = _repositoryManager.CityRepository.FindAll(false).Any();
            if (!anyCity) throw new Exception("Please create Country, State and Cities before adding default contacts.");
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
            //var countries = _repositoryManager.CountryRepository.FindAll(true);
            _repositoryManager.CountryRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeleteTranslations()
        {
            //var translations = _repositoryManager.TranslationRepository.FindAll(true);
            _repositoryManager.TranslationRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeleteTimezones()
        {
            //var timezones = _repositoryManager.TimezoneRepository.FindAll(true);
            _repositoryManager.TimezoneRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeleteStates()
        {
            //var states = _repositoryManager.StateRepository.FindAll(true);
            _repositoryManager.StateRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeleteCities()
        {
            //var cities = _repositoryManager.CityRepository.FindAll(true);
            _repositoryManager.CityRepository.DeleteMany();
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
            //var chatLabels = _repositoryManager.ChatLabelRepository.FindAll(true);
            _repositoryManager.ChatLabelRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeleteWebsiteLabels()
        {
            //var websiteLabels = _repositoryManager.WebsiteLabelRepository.FindAll(true);
            _repositoryManager.WebsiteLabelRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeleteAddressLabels()
        {
            //var addressLabels = _repositoryManager.AddressLabelRepository.FindAll(true);
            _repositoryManager.AddressLabelRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeletePhoneLabels()
        {
            //var phoneLabels = _repositoryManager.PhoneLabelRepository.FindAll(true);
            _repositoryManager.PhoneLabelRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void DeleteEmailLabels()
        {
            //var emailLabels = _repositoryManager.EmailLabelRepository.FindAll(true);
            _repositoryManager.EmailLabelRepository.DeleteMany();
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
            //var allLabels = _repositoryManager.LabelRepository.FindAll(true);
            _repositoryManager.LabelRepository.DeleteMany();
            _repositoryManager.Save();
        }

        private void AddContacts()
        {
            var contacts = _randomDataGenerator.GenerateContacts(130000);
            _repositoryManager.ContactRepository.CreateMany(contacts);
            _repositoryManager.Save();
        }

        private void DeleteContacts()
        {
            //var allContacts = _repositoryManager.ContactRepository.FindAll(true);
            _repositoryManager.ContactRepository.DeleteMany();
            _repositoryManager.Save();
        }

        
    }
}

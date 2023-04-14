﻿using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;
using System.Text.Json;

namespace AddressBook.Services
{
    public class DataResetService : IDataResetService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IRandomDataGenerator _randomDataGenerator;
        private readonly IMapper _mapper;

        public DataResetService(IRepositoryManager repositoryManager,
            IRandomDataGenerator randomDataGenerator,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _randomDataGenerator = randomDataGenerator;
            _mapper = mapper;
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
            AddContacts(25000);
        }

        public void DeleteContacts()
        {
            _repositoryManager.ContactRepository.DeleteAll();
        }

        public void DeleteContactLabels()
        {
            _repositoryManager.ContactLabelRepository.DeleteAll();
        }

        public void DeleteContactEmails()
        {
            _repositoryManager.ContactEmailRepository.DeleteAll();
        }

        public void DeleteContactPhones()
        {
            _repositoryManager.ContactPhoneRepository.DeleteAll();
        }

        public void DeleteContactAddresses()
        {
            _repositoryManager.ContactAddressRepository.DeleteAll();
        }

        public void DeleteContactWebsites()
        {
            _repositoryManager.ContactWebsiteRepository.DeleteAll();
        }

        public void DeleteContactChats()
        {
            _repositoryManager.ContactChatRepository.DeleteAll();
        }

        public void DeleteLabels()
        {
            _repositoryManager.LabelRepository.DeleteAll();
            _repositoryManager.EmailLabelRepository.DeleteAll();
            _repositoryManager.PhoneLabelRepository.DeleteAll();
            _repositoryManager.AddressLabelRepository.DeleteAll();
            _repositoryManager.WebsiteLabelRepository.DeleteAll();
            _repositoryManager.ChatLabelRepository.DeleteAll();
        }

        public void DeleteCountries()
        {
            _repositoryManager.CityRepository.DeleteAll();
            _repositoryManager.StateRepository.DeleteAll();
            _repositoryManager.TimezoneRepository.DeleteAll();
            _repositoryManager.TranslationRepository.DeleteAll();
            _repositoryManager.CountryRepository.DeleteAll();
        }

        public void AddCountriesData(string rootPath)
        {
            ValidationForAddingCountries();

            var countries = ReadCountriesFromJson(rootPath);
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

        private void ValidationForAddingContacts()
        {
            bool anyCity = _repositoryManager.CityRepository.FindAll(false).Any();
            if (!anyCity) throw new Exception("Please create Country, State and Cities before adding default contacts.");
        }

        private IEnumerable<Country> ReadCountriesFromJson(string rootPath)
        {
            var jsonFilePath = Path.Combine(rootPath, "ImportData", "countries+states+cities.json");
            var jsonData = File.ReadAllText(jsonFilePath);
            var countriesImport = JsonSerializer.Deserialize<IEnumerable<CountryImport>>(jsonData);
            var countries = _mapper.Map<IEnumerable<Country>>(countriesImport);
            return countries;
        }

        private void AddChatLabels()
        {
            bool anyChatLabel = _repositoryManager.ChatLabelRepository.FindAll(false).Any();
            if (!anyChatLabel)
            {
                var chatLabels = _randomDataGenerator.GenerateChatLabels();
                _repositoryManager.ChatLabelRepository.CreateMany(chatLabels);
                _repositoryManager.Save();
            }
        }

        private void AddWebsiteLabels()
        {
            bool anyWebsiteLabel = _repositoryManager.WebsiteLabelRepository.FindAll(false).Any();
            if (!anyWebsiteLabel)
            {
                var websiteLabels = _randomDataGenerator.GenerateWebsiteLabels();
                _repositoryManager.WebsiteLabelRepository.CreateMany(websiteLabels);
                _repositoryManager.Save();
            }   
        }

        private void AddAddressLabels()
        {
            bool anyAddressLabel = _repositoryManager.AddressLabelRepository.FindAll(false).Any();
            if (!anyAddressLabel)
            {
                var addressLabels = _randomDataGenerator.GenerateAddressLabels();
                _repositoryManager.AddressLabelRepository.CreateMany(addressLabels);
                _repositoryManager.Save();
            }
        }

        private void AddPhoneLabels()
        {
            bool anyPhoneLabel = _repositoryManager.PhoneLabelRepository.FindAll(false).Any();
            if (!anyPhoneLabel)
            {
                var phoneLabels = _randomDataGenerator.GeneratePhoneLabels();
                _repositoryManager.PhoneLabelRepository.CreateMany(phoneLabels);
                _repositoryManager.Save();
            }
        }

        private void AddEmailLabels()
        {
            bool anyEmailLabel = _repositoryManager.EmailLabelRepository.FindAll(false).Any();
            if (!anyEmailLabel)
            {
                var emailLabels = _randomDataGenerator.GenerateEmailLabels();
                _repositoryManager.EmailLabelRepository.CreateMany(emailLabels);
                _repositoryManager.Save();
            }
        }

        private void AddLabels()
        {
            bool anyLabel = _repositoryManager.LabelRepository.FindAll(false).Any();
            if (!anyLabel)
            {
                var labels = _randomDataGenerator.GenerateLabels();
                _repositoryManager.LabelRepository.CreateMany(labels);
                _repositoryManager.Save();
            }
        }

        private void AddContacts(int numberOfContacts)
        {
            var contacts = _randomDataGenerator.GenerateContacts(numberOfContacts);
            _repositoryManager.ContactRepository.CreateMany(contacts);
            _repositoryManager.Save();
        }

        
    }
}
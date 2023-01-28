using AddressBook.Data;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext _context;
        private readonly Lazy<ICountryRepository> _countryRepository;
        private readonly Lazy<IStateRepository> _stateRepository;
        private readonly Lazy<ICityRepository> _cityRepository;
        private readonly Lazy<ITranslationRepository> _translationRepository;
        private readonly Lazy<ITimezoneRepository> _timezoneRepository;
        private readonly Lazy<IPersonRepository> _personRepository;
        private readonly Lazy<ILabelRepository> _labelRepository;
        private readonly Lazy<IPersonLabelRepository> _personLabelRepository;
        private readonly Lazy<IPersonEmailRepository> _personEmailRepository;
        private readonly Lazy<IEmailLabelRepository> _emailLabelRepository;
        private readonly Lazy<IPersonPhoneRepository> _personPhoneRepository;
        private readonly Lazy<IPhoneLabelRepository> _phoneLabelRepository;
        private readonly Lazy<IPersonAddressRepository> _personAddressRepository;
        private readonly Lazy<IAddressLabelRepository> _addressLabelRepository;
        private readonly Lazy<IPersonWebsiteRepository> _personWebsiteRepository;
        private readonly Lazy<IWebsiteLabelRepository> _websiteLabelRepository;
        private readonly Lazy<IPersonChatRepository> _personChatRepository;
        private readonly Lazy<IChatLabelRepository> _chatLabelRepository;
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            // Initialize all the repositories
            _countryRepository = new Lazy<ICountryRepository>(() =>
                new CountryRepository(context));
            _stateRepository = new Lazy<IStateRepository>(() =>
                new StateRepository(context));
            _cityRepository = new Lazy<ICityRepository>(() =>
                new CityRepository(context));
            _translationRepository = new Lazy<ITranslationRepository>(() =>
                new TranslationRepository(context));
            _timezoneRepository = new Lazy<ITimezoneRepository>(() =>
                new TimezoneRepository(context));
            _personRepository = new Lazy<IPersonRepository>(() =>
                new PersonRepository(context));
            _labelRepository = new Lazy<ILabelRepository>(() =>
                new LabelRepository(context));
            _personLabelRepository = new Lazy<IPersonLabelRepository>(() =>
                new PersonLabelRepository(context));
            _personEmailRepository = new Lazy<IPersonEmailRepository>(() =>
                new PersonEmailRepository(context));
            _emailLabelRepository = new Lazy<IEmailLabelRepository>(() =>
                new EmailLabelRepository(context));
            _personPhoneRepository = new Lazy<IPersonPhoneRepository>(() =>
                new PersonPhoneRepository(context));
            _phoneLabelRepository = new Lazy<IPhoneLabelRepository>(() =>
                new PhoneLabelRepository(context));
            _personAddressRepository = new Lazy<IPersonAddressRepository>(() =>
                new PersonAddressRepository(context));
            _addressLabelRepository = new Lazy<IAddressLabelRepository>(() =>
                new AddressLabelRepository(context));
            _personWebsiteRepository = new Lazy<IPersonWebsiteRepository>(() =>
                new PersonWebsiteRepository(context));
            _websiteLabelRepository = new Lazy<IWebsiteLabelRepository>(() =>
                new WebsiteLabelRepository(context));
            _personChatRepository = new Lazy<IPersonChatRepository>(() =>
                new PersonChatRepository(context));
            _chatLabelRepository = new Lazy<IChatLabelRepository>(() =>
                new ChatLabelRepository(context));
        }

        public ICountryRepository CountryRepository => _countryRepository.Value;
        public IStateRepository StateRepository => _stateRepository.Value;
        public ICityRepository CityRepository => _cityRepository.Value;
        public ITranslationRepository TranslationRepository => _translationRepository.Value;
        public ITimezoneRepository TimezoneRepository => _timezoneRepository.Value;
        public IPersonRepository PersonRepository => _personRepository.Value;
        public ILabelRepository LabelRepository => _labelRepository.Value;
        public IPersonLabelRepository PersonLabelRepository => _personLabelRepository.Value;
        public IPersonEmailRepository PersonEmailRepository => _personEmailRepository.Value;
        public IEmailLabelRepository EmailLabelRepository => _emailLabelRepository.Value;
        public IPersonPhoneRepository PersonPhoneRepository => _personPhoneRepository.Value;
        public IPhoneLabelRepository PhoneLabelRepository => _phoneLabelRepository.Value;
        public IPersonAddressRepository PersonAddressRepository => _personAddressRepository.Value;
        public IAddressLabelRepository AddressLabelRepository => _addressLabelRepository.Value;
        public IPersonWebsiteRepository PersonWebsiteRepository => _personWebsiteRepository.Value;
        public IWebsiteLabelRepository WebsiteLabelRepository => _websiteLabelRepository.Value;
        public IPersonChatRepository PersonChatRepository => _personChatRepository.Value;
        public IChatLabelRepository ChatLabelRepository => _chatLabelRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}

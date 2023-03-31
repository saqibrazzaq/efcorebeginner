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
        private readonly Lazy<IContactRepository> _contactRepository;
        private readonly Lazy<ILabelRepository> _labelRepository;
        private readonly Lazy<IContactLabelRepository> _contactLabelRepository;
        private readonly Lazy<IContactEmailRepository> _contactEmailRepository;
        private readonly Lazy<IEmailLabelRepository> _emailLabelRepository;
        private readonly Lazy<IContactPhoneRepository> _contactPhoneRepository;
        private readonly Lazy<IPhoneLabelRepository> _phoneLabelRepository;
        private readonly Lazy<IContactAddressRepository> _contactAddressRepository;
        private readonly Lazy<IAddressLabelRepository> _addressLabelRepository;
        private readonly Lazy<IContactWebsiteRepository> _contactWebsiteRepository;
        private readonly Lazy<IWebsiteLabelRepository> _websiteLabelRepository;
        private readonly Lazy<IContactChatRepository> _contactChatRepository;
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
            _contactRepository = new Lazy<IContactRepository>(() =>
                new ContactRepository(context));
            _labelRepository = new Lazy<ILabelRepository>(() =>
                new LabelRepository(context));
            _contactLabelRepository = new Lazy<IContactLabelRepository>(() =>
                new ContactLabelRepository(context));
            _contactEmailRepository = new Lazy<IContactEmailRepository>(() =>
                new ContactEmailRepository(context));
            _emailLabelRepository = new Lazy<IEmailLabelRepository>(() =>
                new EmailLabelRepository(context));
            _contactPhoneRepository = new Lazy<IContactPhoneRepository>(() =>
                new ContactPhoneRepository(context));
            _phoneLabelRepository = new Lazy<IPhoneLabelRepository>(() =>
                new PhoneLabelRepository(context));
            _contactAddressRepository = new Lazy<IContactAddressRepository>(() =>
                new ContactAddressRepository(context));
            _addressLabelRepository = new Lazy<IAddressLabelRepository>(() =>
                new AddressLabelRepository(context));
            _contactWebsiteRepository = new Lazy<IContactWebsiteRepository>(() =>
                new ContactWebsiteRepository(context));
            _websiteLabelRepository = new Lazy<IWebsiteLabelRepository>(() =>
                new WebsiteLabelRepository(context));
            _contactChatRepository = new Lazy<IContactChatRepository>(() =>
                new ContactChatRepository(context));
            _chatLabelRepository = new Lazy<IChatLabelRepository>(() =>
                new ChatLabelRepository(context));
        }

        public ICountryRepository CountryRepository => _countryRepository.Value;
        public IStateRepository StateRepository => _stateRepository.Value;
        public ICityRepository CityRepository => _cityRepository.Value;
        public ITranslationRepository TranslationRepository => _translationRepository.Value;
        public ITimezoneRepository TimezoneRepository => _timezoneRepository.Value;
        public IContactRepository ContactRepository => _contactRepository.Value;
        public ILabelRepository LabelRepository => _labelRepository.Value;
        public IContactLabelRepository ContactLabelRepository => _contactLabelRepository.Value;
        public IContactEmailRepository ContactEmailRepository => _contactEmailRepository.Value;
        public IEmailLabelRepository EmailLabelRepository => _emailLabelRepository.Value;
        public IContactPhoneRepository ContactPhoneRepository => _contactPhoneRepository.Value;
        public IPhoneLabelRepository PhoneLabelRepository => _phoneLabelRepository.Value;
        public IContactAddressRepository ContactAddressRepository => _contactAddressRepository.Value;
        public IAddressLabelRepository AddressLabelRepository => _addressLabelRepository.Value;
        public IContactWebsiteRepository ContactWebsiteRepository => _contactWebsiteRepository.Value;
        public IWebsiteLabelRepository WebsiteLabelRepository => _websiteLabelRepository.Value;
        public IContactChatRepository ContactChatRepository => _contactChatRepository.Value;
        public IChatLabelRepository ChatLabelRepository => _chatLabelRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}

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
        }

        public ICountryRepository CountryRepository => _countryRepository.Value;
        public IStateRepository StateRepository => _stateRepository.Value;
        public ICityRepository CityRepository => _cityRepository.Value;
        public ITranslationRepository TranslationRepository => _translationRepository.Value;
        public ITimezoneRepository TimezoneRepository => _timezoneRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}

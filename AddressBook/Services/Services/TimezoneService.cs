using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class TimezoneService : ITimezoneService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public TimezoneService(IMapper mapper, 
            IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public int Count()
        {
            return _repositoryManager.TimezoneRepository.FindAll(false)
                .Count();
        }

        public int Count(int countryId)
        {
            return _repositoryManager.TimezoneRepository.FindByCondition(
                x => x.CountryId == countryId,
                false)
                .Count();
        }

        public TimezoneRes Create(TimezoneReqEdit dto)
        {
            var entity = _mapper.Map<Timezone>(dto);
            _repositoryManager.TimezoneRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<TimezoneRes>(entity);
        }

        public void Delete(int timezoneId)
        {
            var entity = FindTimezoneIfExists(timezoneId, true);
            _repositoryManager.TimezoneRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Timezone FindTimezoneIfExists(int timezoneId, bool trackChanges)
        {
            var entity = _repositoryManager.TimezoneRepository.FindByCondition(
                x => x.TimezoneId == timezoneId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No timezone found with id " + timezoneId); }

            return entity;
        }

        public TimezoneRes Get(int timezoneId)
        {
            var entity = FindTimezoneIfExists(timezoneId, false);
            var dto = _mapper.Map<TimezoneRes>(entity);
            return dto;
        }

        public ApiOkPagedResponse<IEnumerable<TimezoneRes>, MetaData> Search(TimezoneReqSearch dto)
        {
            var pagedEntities = _repositoryManager.TimezoneRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<TimezoneRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<TimezoneRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public TimezoneRes Update(int timezoneId, TimezoneReqEdit dto)
        {
            var entity = FindTimezoneIfExists(timezoneId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<TimezoneRes>(entity);
        }
    }
}

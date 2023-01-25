using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PersonPhoneService : IPersonPhoneService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonPhoneService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PersonPhoneRes Create(PersonPhoneReqEdit dto)
        {
            var entity = _mapper.Map<PersonPhone>(dto);
            _repositoryManager.PersonPhoneRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonPhoneRes>(entity);
        }

        public void Delete(int personPhoneId)
        {
            var entity = FindPersonPhoneIfExists(personPhoneId, true);
            _repositoryManager.PersonPhoneRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private PersonPhone FindPersonPhoneIfExists(int personPhoneId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonPhoneRepository.FindByCondition(
                x => x.PersonPhoneId == personPhoneId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No person phone found with id " + personPhoneId); }
            return entity;
        }

        public PersonPhoneRes Get(int personPhoneId)
        {
            var entity = FindPersonPhoneIfExists(personPhoneId, false);
            return _mapper.Map<PersonPhoneRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PersonPhoneRes>, MetaData> Search(PersonPhoneReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PersonPhoneRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PersonPhoneRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PersonPhoneRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PersonPhoneRes Update(int personPhoneId, PersonPhoneReqEdit dto)
        {
            var entity = FindPersonPhoneIfExists(personPhoneId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonPhoneRes>(entity);
        }
    }
}

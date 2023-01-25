using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PersonService : IPersonService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PersonRes Create(PersonReqEdit dto)
        {
            var entity = _mapper.Map<Person>(dto);
            _repositoryManager.PersonRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonRes>(entity);
        }

        public void Delete(int personId)
        {
            var entity = FindPersonIfExists(personId, true);
            _repositoryManager.PersonRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Person FindPersonIfExists(int personId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonRepository.FindByCondition(
                x => x.PersonId == personId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No person found with id " + personId); }
            return entity;
        }

        public PersonRes Get(int personId)
        {
            var entity = FindPersonIfExists(personId, false);
            return _mapper.Map<PersonRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PersonRes>, MetaData> Search(PersonReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PersonRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PersonRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PersonRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PersonRes Update(int personId, PersonReqEdit dto)
        {
            var entity = FindPersonIfExists(personId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonRes>(entity);
        }
    }
}

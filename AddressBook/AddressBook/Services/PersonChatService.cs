using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PersonChatService : IPersonChatService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonChatService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PersonChatRes Create(PersonChatReqEdit dto)
        {
            var entity = _mapper.Map<PersonChat>(dto);
            _repositoryManager.PersonChatRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonChatRes>(entity);
        }

        public void Delete(int personChatId)
        {
            var entity = FindPersonChatIfExists(personChatId, true);
            _repositoryManager.PersonChatRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private PersonChat FindPersonChatIfExists(int personChatId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonChatRepository.FindByCondition(
                x => x.PersonChatId == personChatId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No person chat found with id " + personChatId); }
            return entity;
        }

        public PersonChatRes Get(int personChatId)
        {
            var entity = FindPersonChatIfExists(personChatId, false);
            return _mapper.Map<PersonChatRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PersonChatRes>, MetaData> Search(PersonChatReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PersonChatRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PersonChatRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PersonChatRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PersonChatRes Update(int personChatId, PersonChatReqEdit dto)
        {
            var entity = FindPersonChatIfExists(personChatId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonChatRes>(entity);
        }
    }
}

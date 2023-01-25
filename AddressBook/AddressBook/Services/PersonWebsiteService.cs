using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PersonWebsiteService : IPersonWebsiteService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonWebsiteService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PersonWebsiteRes Create(PersonWebsiteReqEdit dto)
        {
            var entity = _mapper.Map<PersonWebsite>(dto);
            _repositoryManager.PersonWebsiteRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonWebsiteRes>(entity);
        }

        public void Delete(int personWebsiteId)
        {
            var entity = FindPersonWebsiteIfExists(personWebsiteId, true);
            _repositoryManager.PersonWebsiteRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private PersonWebsite FindPersonWebsiteIfExists(int personWebsiteId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonWebsiteRepository.FindByCondition(
                x => x.PersonWebsiteId == personWebsiteId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No person website found with id " + personWebsiteId); }
            return entity;
        }

        public PersonWebsiteRes Get(int personWebsiteId)
        {
            var entity = FindPersonWebsiteIfExists(personWebsiteId, false);
            return _mapper.Map<PersonWebsiteRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PersonWebsiteRes>, MetaData> Search(PersonWebsiteReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PersonWebsiteRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PersonWebsiteRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PersonWebsiteRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PersonWebsiteRes Update(int personWebsiteId, PersonWebsiteReqEdit dto)
        {
            var entity = FindPersonWebsiteIfExists(personWebsiteId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonWebsiteRes>(entity);
        }
    }
}

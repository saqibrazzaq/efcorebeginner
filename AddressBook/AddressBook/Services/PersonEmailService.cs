using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PersonEmailService : IPersonEmailService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonEmailService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PersonEmailRes Create(PersonEmailReqEdit dto)
        {
            var entity = _mapper.Map<PersonEmail>(dto);
            _repositoryManager.PersonEmailRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonEmailRes>(entity);
        }

        public void Delete(int personEmailId)
        {
            var entity = FindPersonEmailIfExists(personEmailId, true);
            _repositoryManager.PersonEmailRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private PersonEmail FindPersonEmailIfExists(int personEmailId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonEmailRepository.FindByCondition(
                x => x.PersonEmailId == personEmailId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No person email found with id " + personEmailId); }
            return entity;
        }

        public PersonEmailRes Get(int personEmailId)
        {
            var entity = FindPersonEmailIfExists(personEmailId, false);
            return _mapper.Map<PersonEmailRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PersonEmailRes>, MetaData> Search(PersonEmailReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PersonEmailRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PersonEmailRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PersonEmailRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PersonEmailRes Update(int personEmailId, PersonEmailReqEdit dto)
        {
            var entity = FindPersonEmailIfExists(personEmailId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonEmailRes>(entity);
        }
    }
}

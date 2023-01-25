using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PersonAddressService : IPersonAddressService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonAddressService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PersonAddressRes Create(PersonAddressReqEdit dto)
        {
            var entity = _mapper.Map<PersonAddress>(dto);
            _repositoryManager.PersonAddressRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonAddressRes>(entity);
        }

        public void Delete(int personAddressId)
        {
            var entity = FindPersonAddressIfExists(personAddressId, true);
            _repositoryManager.PersonAddressRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private PersonAddress FindPersonAddressIfExists(int personAddressId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonAddressRepository.FindByCondition(
                x => x.PersonAddressId == personAddressId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No person address found with id " + personAddressId); }
            return entity;
        }

        public PersonAddressRes Get(int personAddressId)
        {
            var entity = FindPersonAddressIfExists(personAddressId, false);
            return _mapper.Map<PersonAddressRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PersonAddressRes>, MetaData> Search(PersonAddressReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PersonAddressRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PersonAddressRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PersonAddressRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PersonAddressRes Update(int personAddressId, PersonAddressReqEdit dto)
        {
            var entity = FindPersonAddressIfExists(personAddressId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonAddressRes>(entity);
        }
    }
}

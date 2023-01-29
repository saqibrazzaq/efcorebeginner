using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class ContactAddressService : IContactAddressService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ContactAddressService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ContactAddressRes Create(ContactAddressReqEdit dto)
        {
            var entity = _mapper.Map<ContactAddress>(dto);
            _repositoryManager.ContactAddressRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactAddressRes>(entity);
        }

        public void Delete(int contactAddressId)
        {
            var entity = FindContactAddressIfExists(contactAddressId, true);
            _repositoryManager.ContactAddressRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ContactAddress FindContactAddressIfExists(int contactAddressId, bool trackChanges)
        {
            var entity = _repositoryManager.ContactAddressRepository.FindByCondition(
                x => x.ContactAddressId == contactAddressId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No contact address found with id " + contactAddressId); }
            return entity;
        }

        public ContactAddressRes Get(int contactAddressId)
        {
            var entity = FindContactAddressIfExists(contactAddressId, false);
            return _mapper.Map<ContactAddressRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ContactAddressRes>, MetaData> Search(ContactAddressReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ContactAddressRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ContactAddressRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ContactAddressRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ContactAddressRes Update(int contactAddressId, ContactAddressReqEdit dto)
        {
            var entity = FindContactAddressIfExists(contactAddressId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactAddressRes>(entity);
        }
    }
}

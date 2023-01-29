using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class ContactService : IContactService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ContactService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ContactRes Create(ContactReqEdit dto)
        {
            var entity = _mapper.Map<Contact>(dto);
            _repositoryManager.ContactRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactRes>(entity);
        }

        public void Delete(int contactId)
        {
            var entity = FindContactIfExists(contactId, true);
            _repositoryManager.ContactRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Contact FindContactIfExists(int contactId, bool trackChanges)
        {
            var entity = _repositoryManager.ContactRepository.FindByCondition(
                x => x.ContactId == contactId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No contact found with id " + contactId); }
            return entity;
        }

        public ContactRes Get(int contactId)
        {
            var entity = FindContactIfExists(contactId, false);
            return _mapper.Map<ContactRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ContactRes>, MetaData> Search(ContactReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ContactRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ContactRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ContactRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ContactRes Update(int contactId, ContactReqEdit dto)
        {
            var entity = FindContactIfExists(contactId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactRes>(entity);
        }
    }
}

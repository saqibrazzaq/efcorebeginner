using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class ContactEmailService : IContactEmailService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ContactEmailService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ContactEmailRes Create(ContactEmailReqEdit dto)
        {
            var entity = _mapper.Map<ContactEmail>(dto);
            _repositoryManager.ContactEmailRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactEmailRes>(entity);
        }

        public void Delete(int contactEmailId)
        {
            var entity = FindContactEmailIfExists(contactEmailId, true);
            _repositoryManager.ContactEmailRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ContactEmail FindContactEmailIfExists(int contactEmailId, bool trackChanges)
        {
            var entity = _repositoryManager.ContactEmailRepository.FindByCondition(
                x => x.ContactEmailId == contactEmailId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No contact email found with id " + contactEmailId); }
            return entity;
        }

        public ContactEmailRes Get(int contactEmailId)
        {
            var entity = FindContactEmailIfExists(contactEmailId, false);
            return _mapper.Map<ContactEmailRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ContactEmailRes>, MetaData> Search(ContactEmailReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ContactEmailRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ContactEmailRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ContactEmailRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ContactEmailRes Update(int contactEmailId, ContactEmailReqEdit dto)
        {
            var entity = FindContactEmailIfExists(contactEmailId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactEmailRes>(entity);
        }
    }
}

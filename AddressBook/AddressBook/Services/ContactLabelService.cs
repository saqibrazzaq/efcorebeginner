using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class ContactLabelService : IContactLabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ContactLabelService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ContactLabelRes Create(ContactLabelReqEdit dto)
        {
            var entity = _mapper.Map<ContactLabel>(dto);
            _repositoryManager.ContactLabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactLabelRes>(entity);
        }

        public void Delete(int contactLabelId)
        {
            var entity = FindContactLabelIfExists(contactLabelId, true);
            _repositoryManager.ContactLabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ContactLabel FindContactLabelIfExists(int contactLabelId, bool trackChanges)
        {
            var entity = _repositoryManager.ContactLabelRepository.FindByCondition(
                x => x.ContactLabelId == contactLabelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No contact label found with id " + contactLabelId); }
            return entity;
        }

        public ContactLabelRes Get(int contactLabelId)
        {
            var entity = FindContactLabelIfExists(contactLabelId, false);
            return _mapper.Map<ContactLabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ContactLabelRes>, MetaData> Search(ContactLabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ContactLabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ContactLabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ContactLabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ContactLabelRes Update(int contactLabelId, ContactLabelReqEdit dto)
        {
            var entity = FindContactLabelIfExists(contactLabelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactLabelRes>(entity);
        }
    }
}

using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Services
{
    public class ContactChatService : IContactChatService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ContactChatService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ContactChatRes Create(ContactChatReqEdit dto)
        {
            var entity = _mapper.Map<ContactChat>(dto);
            _repositoryManager.ContactChatRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactChatRes>(entity);
        }

        public void Delete(int contactChatId)
        {
            var entity = FindContactChatIfExists(contactChatId, true);
            _repositoryManager.ContactChatRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ContactChat FindContactChatIfExists(int contactChatId, bool trackChanges)
        {
            var entity = _repositoryManager.ContactChatRepository.FindByCondition(
                x => x.ContactChatId == contactChatId, trackChanges,
                include: i => i.Include(x => x.ChatLabel))
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No contact chat found with id " + contactChatId); }
            return entity;
        }

        public ContactChatRes Get(int contactChatId)
        {
            var entity = FindContactChatIfExists(contactChatId, false);
            return _mapper.Map<ContactChatRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ContactChatRes>, MetaData> Search(ContactChatReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ContactChatRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ContactChatRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ContactChatRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ContactChatRes Update(int contactChatId, ContactChatReqEdit dto)
        {
            var entity = FindContactChatIfExists(contactChatId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactChatRes>(entity);
        }

        public bool AnyChats(int chatLabelId)
        {
            return _repositoryManager.ContactChatRepository.FindByCondition(
                x => x.ChatLabelId == chatLabelId,
                false)
                .Any();
        }
    }
}

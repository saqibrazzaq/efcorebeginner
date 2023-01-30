using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Services
{
    public class ContactWebsiteService : IContactWebsiteService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ContactWebsiteService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ContactWebsiteRes Create(ContactWebsiteReqEdit dto)
        {
            var entity = _mapper.Map<ContactWebsite>(dto);
            _repositoryManager.ContactWebsiteRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactWebsiteRes>(entity);
        }

        public void Delete(int contactWebsiteId)
        {
            var entity = FindContactWebsiteIfExists(contactWebsiteId, true);
            _repositoryManager.ContactWebsiteRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ContactWebsite FindContactWebsiteIfExists(int contactWebsiteId, bool trackChanges)
        {
            var entity = _repositoryManager.ContactWebsiteRepository.FindByCondition(
                x => x.ContactWebsiteId == contactWebsiteId, trackChanges,
                include: i => i.Include(x => x.WebsiteLabel))
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No contact website found with id " + contactWebsiteId); }
            return entity;
        }

        public ContactWebsiteRes Get(int contactWebsiteId)
        {
            var entity = FindContactWebsiteIfExists(contactWebsiteId, false);
            return _mapper.Map<ContactWebsiteRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ContactWebsiteRes>, MetaData> Search(ContactWebsiteReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ContactWebsiteRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ContactWebsiteRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ContactWebsiteRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ContactWebsiteRes Update(int contactWebsiteId, ContactWebsiteReqEdit dto)
        {
            var entity = FindContactWebsiteIfExists(contactWebsiteId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactWebsiteRes>(entity);
        }
    }
}

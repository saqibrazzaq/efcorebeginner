using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Services
{
    public class ContactPhoneService : IContactPhoneService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ContactPhoneService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ContactPhoneRes Create(ContactPhoneReqEdit dto)
        {
            var entity = _mapper.Map<ContactPhone>(dto);
            _repositoryManager.ContactPhoneRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactPhoneRes>(entity);
        }

        public void Delete(int contactPhoneId)
        {
            var entity = FindContactPhoneIfExists(contactPhoneId, true);
            _repositoryManager.ContactPhoneRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ContactPhone FindContactPhoneIfExists(int contactPhoneId, bool trackChanges)
        {
            var entity = _repositoryManager.ContactPhoneRepository.FindByCondition(
                x => x.ContactPhoneId == contactPhoneId, trackChanges,
                include: i => i
                    .Include(x => x.Country)
                    .Include(x => x.PhoneLabel)
                )
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No contact phone found with id " + contactPhoneId); }
            return entity;
        }

        public ContactPhoneRes Get(int contactPhoneId)
        {
            var entity = FindContactPhoneIfExists(contactPhoneId, false);
            return _mapper.Map<ContactPhoneRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ContactPhoneRes>, MetaData> Search(ContactPhoneReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ContactPhoneRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ContactPhoneRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ContactPhoneRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ContactPhoneRes Update(int contactPhoneId, ContactPhoneReqEdit dto)
        {
            var entity = FindContactPhoneIfExists(contactPhoneId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ContactPhoneRes>(entity);
        }

        public bool AnyPhone(int phoneLabelId)
        {
            return _repositoryManager.ContactPhoneRepository.FindByCondition(
                x => x.PhoneLabelId == phoneLabelId,
                false)
                .Any();
        }

        public int Count()
        {
            return _repositoryManager.ContactPhoneRepository.FindAll(false)
                .Count();
        }
    }
}

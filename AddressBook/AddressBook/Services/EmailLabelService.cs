using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class EmailLabelService : IEmailLabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public EmailLabelService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public EmailLabelRes Create(EmailLabelReqEdit dto)
        {
            var entity = _mapper.Map<EmailLabel>(dto);
            _repositoryManager.EmailLabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<EmailLabelRes>(entity);
        }

        public void Delete(int emailLabelId)
        {
            var entity = FindEmailLableIfExists(emailLabelId, true);
            _repositoryManager.EmailLabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private EmailLabel FindEmailLableIfExists(int emailLabelId, bool trackChanges)
        {
            var entity = _repositoryManager.EmailLabelRepository.FindByCondition(
                x => x.EmailLabelId == emailLabelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No email label found with id " + emailLabelId); }
            return entity;
        }

        public EmailLabelRes Get(int emailLabelId)
        {
            var entity = FindEmailLableIfExists(emailLabelId, false);
            return _mapper.Map<EmailLabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<EmailLabelRes>, MetaData> Search(EmailLabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.EmailLabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<EmailLabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<EmailLabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public EmailLabelRes Update(int emailLabelId, EmailLabelReqEdit dto)
        {
            var entity = FindEmailLableIfExists(emailLabelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<EmailLabelRes>(entity);
        }
    }
}

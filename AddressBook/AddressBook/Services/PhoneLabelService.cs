using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PhoneLabelService : IPhoneLabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PhoneLabelService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PhoneLabelRes Create(PhoneLabelReqEdit dto)
        {
            var entity = _mapper.Map<PhoneLabel>(dto);
            _repositoryManager.PhoneLabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PhoneLabelRes>(entity);
        }

        public void Delete(int phoneLabelId)
        {
            var entity = FindPhoneLabelIfExists(phoneLabelId, true);
            _repositoryManager.PhoneLabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private PhoneLabel FindPhoneLabelIfExists(int phoneLabelId, bool trackChanges)
        {
            var entity = _repositoryManager.PhoneLabelRepository.FindByCondition(
                x => x.PhoneLabelId == phoneLabelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No phone label found with id " + phoneLabelId); }
            return entity;
        }

        public PhoneLabelRes Get(int phoneLabelId)
        {
            var entity = FindPhoneLabelIfExists(phoneLabelId, false);
            return _mapper.Map<PhoneLabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PhoneLabelRes>, MetaData> Search(PhoneLabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PhoneLabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PhoneLabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PhoneLabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PhoneLabelRes Update(int phoneLabelId, PhoneLabelReqEdit dto)
        {
            var entity = FindPhoneLabelIfExists(phoneLabelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PhoneLabelRes>(entity);
        }
    }
}

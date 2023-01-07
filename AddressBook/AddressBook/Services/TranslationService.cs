using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class TranslationService : ITranslationService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public TranslationService(IMapper mapper, 
            IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public int Count()
        {
            return _repositoryManager.TranslationRepository.FindAll(false)
                .Count();
        }

        public int Count(int countryId)
        {
            return _repositoryManager.TranslationRepository.FindByCondition(
                x => x.CountryId == countryId,
                false)
                .Count();
        }

        public TranslationRes Create(TranslationReqEdit dto)
        {
            var entity = _mapper.Map<Translation>(dto);
            _repositoryManager.TranslationRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<TranslationRes>(entity);
        }

        public void Delete(int translationId)
        {
            var entity = FindTranslationIfExists(translationId, true);
        }

        private Translation FindTranslationIfExists(int translationId, bool trackChanges)
        {
            var entity = _repositoryManager.TranslationRepository.FindByCondition(
                x => x.TranslationId == translationId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No translation found with id " + translationId); }

            return entity;
        }

        public TranslationRes Get(int translationId)
        {
            var entity = FindTranslationIfExists(translationId, false);
            var dto = _mapper.Map<TranslationRes>(entity);
            return dto;
        }

        public ApiOkPagedResponse<IEnumerable<TranslationRes>, MetaData> Search(TranslationReqSearch dto)
        {
            var pagedEntities = _repositoryManager.TranslationRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<TranslationRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<TranslationRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public TranslationRes Update(int translationId, TranslationReqEdit dto)
        {
            var entity = FindTranslationIfExists(translationId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<TranslationRes>(entity);
        }
    }
}

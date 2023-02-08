using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class LabelService : ILabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IContactLabelService _contactLabelService;
        public LabelService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IContactLabelService contactLabelService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _contactLabelService = contactLabelService;
        }

        public LabelRes Create(LabelReqEdit dto)
        {
            var entity = _mapper.Map<Label>(dto);
            _repositoryManager.LabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<LabelRes>(entity);
        }

        public void Delete(int labelId)
        {
            ValidateForDelete(labelId);

            var entity = FindLabelIfExists(labelId, true);
            _repositoryManager.LabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private void ValidateForDelete(int labelId)
        {
            if (_contactLabelService.AnyContact(labelId))
            {
                throw new Exception("Cannot delete Label. It has contacts.");
            }
        }

        private Label FindLabelIfExists(int labelId, bool trackChanges)
        {
            var entity = _repositoryManager.LabelRepository.FindByCondition(
                x => x.LabelId == labelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No label found with id " + labelId); }
            return entity;
        }

        public LabelRes Get(int labelId)
        {
            var entity = FindLabelIfExists(labelId, false);
            return _mapper.Map<LabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<LabelRes>, MetaData> Search(LabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.LabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<LabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<LabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public LabelRes Update(int labelId, LabelReqEdit dto)
        {
            var entity = FindLabelIfExists(labelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<LabelRes>(entity);
        }
    }
}

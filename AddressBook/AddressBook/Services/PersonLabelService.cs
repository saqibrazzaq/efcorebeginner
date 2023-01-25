using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class PersonLabelService : IPersonLabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonLabelService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PersonLabelRes Create(PersonLabelReqEdit dto)
        {
            var entity = _mapper.Map<PersonLabel>(dto);
            _repositoryManager.PersonLabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonLabelRes>(entity);
        }

        public void Delete(int personLabelId)
        {
            var entity = FindPersonLabelIfExists(personLabelId, true);
            _repositoryManager.PersonLabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private PersonLabel FindPersonLabelIfExists(int personLabelId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonLabelRepository.FindByCondition(
                x => x.PersonLabelId == personLabelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No person label found with id " + personLabelId); }
            return entity;
        }

        public PersonLabelRes Get(int personLabelId)
        {
            var entity = FindPersonLabelIfExists(personLabelId, false);
            return _mapper.Map<PersonLabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<PersonLabelRes>, MetaData> Search(PersonLabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.PersonLabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<PersonLabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<PersonLabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public PersonLabelRes Update(int personLabelId, PersonLabelReqEdit dto)
        {
            var entity = FindPersonLabelIfExists(personLabelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonLabelRes>(entity);
        }
    }
}

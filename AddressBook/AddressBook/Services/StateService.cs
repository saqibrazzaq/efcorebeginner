using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class StateService : IStateService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public StateService(IMapper mapper, 
            IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public int Count()
        {
            return _repositoryManager.StateRepository.FindAll(false)
                .Count();
        }

        public int Count(int countryId)
        {
            return _repositoryManager.StateRepository.FindByCondition(
                x => x.CountryId == countryId,
                false)
                .Count();
        }

        public StateRes Create(StateReqEdit dto)
        {
            var entity = _mapper.Map<State>(dto);
            _repositoryManager.StateRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<StateRes>(entity);
        }

        public void Delete(int stateId)
        {
            var entity = FindStateIfExists(stateId, true);
        }

        private State FindStateIfExists(int stateId, bool trackChanges)
        {
            var entity = _repositoryManager.StateRepository.FindByCondition(
                x => x.StateId == stateId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No state found with id " + stateId); }

            return entity;
        }

        public StateRes Get(int stateId)
        {
            var entity = FindStateIfExists(stateId, false);
            var dto = _mapper.Map<StateRes>(entity);
            return dto;
        }

        public ApiOkPagedResponse<IEnumerable<StateRes>, MetaData> Search(StateReqSearch dto)
        {
            var pagedEntities = _repositoryManager.StateRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<StateRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<StateRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public StateRes Update(int stateId, StateReqEdit dto)
        {
            var entity = FindStateIfExists(stateId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<StateRes>(entity);
        }
    }
}

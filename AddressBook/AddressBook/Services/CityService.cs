using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class CityService : ICityService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CityService(IMapper mapper, 
            IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public int Count()
        {
            return _repositoryManager.CityRepository.FindAll(false)
                .Count();
        }

        public int Count(int stateId)
        {
            return _repositoryManager.CityRepository.FindByCondition(
                x => x.StateId == stateId,
                false)
                .Count();
        }

        public CityRes Create(CityReqEdit dto)
        {
            var entity = _mapper.Map<City>(dto);
            _repositoryManager.CityRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<CityRes>(entity);
        }

        public void Delete(int cityId)
        {
            var entity = FindCityIfExists(cityId, true);
            _repositoryManager.CityRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private City FindCityIfExists(int cityId, bool trackChanges)
        {
            var entity = _repositoryManager.CityRepository.FindByCondition(
                x => x.CityId == cityId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) { throw new Exception("No city found with id " + cityId); }

            return entity;
        }

        public CityRes Get(int cityId)
        {
            var entity = FindCityIfExists(cityId, false);
            var dto = _mapper.Map<CityRes>(entity);
            return dto;
        }

        public ApiOkPagedResponse<IEnumerable<CityRes>, MetaData> Search(CityReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CityRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<CityRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CityRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public CityRes Update(int cityId, CityReqEdit dto)
        {
            var entity = FindCityIfExists(cityId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<CityRes>(entity);
        }
    }
}

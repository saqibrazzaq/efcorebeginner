using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class WebsiteLabelService : IWebsiteLabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public WebsiteLabelService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public WebsiteLabelRes Create(WebsiteLabelReqEdit dto)
        {
            var entity = _mapper.Map<WebsiteLabel>(dto);
            _repositoryManager.WebsiteLabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<WebsiteLabelRes>(entity);
        }

        public void Delete(int websiteLabelId)
        {
            var entity = FindWebsiteLabelIfExists(websiteLabelId, true);
            _repositoryManager.WebsiteLabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private WebsiteLabel FindWebsiteLabelIfExists(int websiteLabelId, bool trackChanges)
        {
            var entity = _repositoryManager.WebsiteLabelRepository.FindByCondition(
                x => x.WebsiteLabelId == websiteLabelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No website label found with id " + websiteLabelId); }
            return entity;
        }

        public WebsiteLabelRes Get(int websiteLabelId)
        {
            var entity = FindWebsiteLabelIfExists(websiteLabelId, false);
            return _mapper.Map<WebsiteLabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<WebsiteLabelRes>, MetaData> Search(WebsiteLabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.WebsiteLabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<WebsiteLabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<WebsiteLabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public WebsiteLabelRes Update(int websiteLabelId, WebsiteLabelReqEdit dto)
        {
            var entity = FindWebsiteLabelIfExists(websiteLabelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<WebsiteLabelRes>(entity);
        }
    }
}

using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using AddressBook.Repository;
using AutoMapper;

namespace AddressBook.Services
{
    public class ChatLabelService : IChatLabelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ChatLabelService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ChatLabelRes Create(ChatLabelReqEdit dto)
        {
            var entity = _mapper.Map<ChatLabel>(dto);
            _repositoryManager.ChatLabelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ChatLabelRes>(entity);
        }

        public void Delete(int chatLabelId)
        {
            var entity = FindChatLabelIfExists(chatLabelId, true);
            _repositoryManager.ChatLabelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ChatLabel FindChatLabelIfExists(int chatLabelId, bool trackChanges)
        {
            var entity = _repositoryManager.ChatLabelRepository.FindByCondition(
                x => x.ChatLabelId == chatLabelId, trackChanges)
                .FirstOrDefault();

            if (entity == null) { throw new Exception("No chat label found with id " + chatLabelId); }
            return entity;
        }

        public ChatLabelRes Get(int chatLabelId)
        {
            var entity = FindChatLabelIfExists(chatLabelId, false);
            return _mapper.Map<ChatLabelRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ChatLabelRes>, MetaData> Search(ChatLabelReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ChatLabelRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ChatLabelRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ChatLabelRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ChatLabelRes Update(int chatLabelId, ChatLabelReqEdit dto)
        {
            var entity = FindChatLabelIfExists(chatLabelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ChatLabelRes>(entity);
        }
    }
}

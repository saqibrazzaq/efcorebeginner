using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IChatLabelService
    {
        ChatLabelRes Create(ChatLabelReqEdit dto);
        ChatLabelRes Update(int chatLabelId, ChatLabelReqEdit dto);
        void Delete(int chatLabelId);
        ChatLabelRes Get(int chatLabelId);
        ApiOkPagedResponse<IEnumerable<ChatLabelRes>, MetaData>
            Search(ChatLabelReqSearch dto);
    }
}

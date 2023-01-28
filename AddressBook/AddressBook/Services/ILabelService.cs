using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface ILabelService
    {
        LabelRes Create(LabelReqEdit dto);
        LabelRes Update(int labelId, LabelReqEdit dto);
        void Delete(int labelId);
        LabelRes Get(int labelId);
        ApiOkPagedResponse<IEnumerable<LabelRes>, MetaData>
            Search(LabelReqSearch dto);
    }
}

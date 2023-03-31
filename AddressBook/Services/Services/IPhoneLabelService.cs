using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPhoneLabelService
    {
        PhoneLabelRes Create(PhoneLabelReqEdit dto);
        PhoneLabelRes Update(int phoneLabelId, PhoneLabelReqEdit dto);
        void Delete(int phoneLabelId);
        PhoneLabelRes Get(int phoneLabelId);
        ApiOkPagedResponse<IEnumerable<PhoneLabelRes>, MetaData>
            Search(PhoneLabelReqSearch dto);
        int Count();
    }
}

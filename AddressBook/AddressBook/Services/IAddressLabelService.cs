using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IAddressLabelService
    {
        AddressLabelRes Create(AddressLabelReqEdit dto);
        AddressLabelRes Update(int addressLabelId, AddressLabelReqEdit dto);
        void Delete(int addressLabelId);
        AddressLabelRes Get(int addressLabelId);
        ApiOkPagedResponse<IEnumerable<AddressLabelRes>, MetaData>
            Search(AddressLabelReqSearch dto);
    }
}

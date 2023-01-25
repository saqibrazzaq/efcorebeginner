using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IPersonLabelService
    {
        PersonLabelRes Create(PersonLabelReqEdit dto);
        PersonLabelRes Update(int personLabelId, PersonLabelReqEdit dto);
        void Delete(int personLabelId);
        PersonLabelRes Get(int personLabelId);
        ApiOkPagedResponse<IEnumerable<PersonLabelRes>, MetaData>
            Search(PersonLabelReqSearch dto);
    }
}

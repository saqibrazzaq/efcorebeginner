using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IStateService
    {
        StateRes Create(StateReqEdit dto);
        StateRes Update(int stateId, StateReqEdit dto);
        void Delete(int stateId);
        StateRes Get(int stateId);
        int Count();
        int Count(int countryId);
        ApiOkPagedResponse<IEnumerable<StateRes>, MetaData>
            Search(StateReqSearch dto);
    }
}

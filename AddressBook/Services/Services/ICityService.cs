using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface ICityService
    {
        CityRes Create(CityReqEdit dto);
        CityRes Update(int cityId, CityReqEdit dto);
        void Delete(int cityId);
        CityRes Get(int cityId);
        int Count();
        int Count(int stateId);
        ApiOkPagedResponse<IEnumerable<CityRes>, MetaData>
            Search(CityReqSearch dto);
    }
}

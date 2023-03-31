using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface ITimezoneService
    {
        TimezoneRes Create(TimezoneReqEdit dto);
        TimezoneRes Update(int timezoneId, TimezoneReqEdit dto);
        void Delete(int timezoneId);
        TimezoneRes Get(int timezoneId);
        int Count();
        int Count(int countryId);
        ApiOkPagedResponse<IEnumerable<TimezoneRes>, MetaData>
            Search(TimezoneReqSearch dto);
    }
}

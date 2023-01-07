using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface ICountryService
    {
        CountryRes Create(CountryReqEdit dto);
        CountryRes Update(int countryId, CountryReqEdit dto);
        void Delete(int countryId);
        CountryRes Get(int countryId);
        int Count();
        ApiOkPagedResponse<IEnumerable<CountryRes>, MetaData>
            Search(CountryReqSearch dto);
    }
}

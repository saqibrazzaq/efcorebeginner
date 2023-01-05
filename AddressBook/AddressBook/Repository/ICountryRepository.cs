using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface ICountryRepository : IRepositoryBase<Country>
    {
        PagedList<Country> Search(CountryReqSearch dto, bool trackChanges);
    }
}

using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface ICityRepository : IRepositoryBase<City>
    {
        PagedList<City> Search(CityReqSearch dto, bool trackChanges);
    }
}

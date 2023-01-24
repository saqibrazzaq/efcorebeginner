using AddressBook.Common.Paging;
using AddressBook.Data;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public class PersonAddressRepository : RepositoryBase<PersonAddress>, IPersonAddressRepository
    {
        public PersonAddressRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<PersonAddress> Search(PersonAddressReqSearch dto, bool trackChanges)
        {
            var entities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges)
                .Search(dto)
                .Count();
            return new PagedList<PersonAddress>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}

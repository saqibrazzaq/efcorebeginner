using AddressBook.Common.Paging;
using AddressBook.Data;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public class ContactAddressRepository : RepositoryBase<ContactAddress>, IContactAddressRepository
    {
        public ContactAddressRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<ContactAddress> Search(ContactAddressReqSearch dto, bool trackChanges)
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
            return new PagedList<ContactAddress>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}

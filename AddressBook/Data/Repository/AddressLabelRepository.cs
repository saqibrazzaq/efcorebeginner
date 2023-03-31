using AddressBook.Common.Paging;
using AddressBook.Data;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public class AddressLabelRepository : RepositoryBase<AddressLabel>, IAddressLabelRepository
    {
        public AddressLabelRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<AddressLabel> Search(AddressLabelReqSearch dto, bool trackChanges)
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
            return new PagedList<AddressLabel>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}

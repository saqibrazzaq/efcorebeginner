using AddressBook.Common.Paging;
using AddressBook.Data;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public class LabelRepository : RepositoryBase<Label>, ILabelRepository
    {
        public LabelRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<Label> Search(LabelReqSearch dto, bool trackChanges)
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
            return new PagedList<Label>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}

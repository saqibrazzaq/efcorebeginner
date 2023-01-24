using AddressBook.Common.Paging;
using AddressBook.Data;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public class PersonLabelRepository : RepositoryBase<PersonLabel>, IPersonLabelRepository
    {
        public PersonLabelRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<PersonLabel> Search(PersonLabelReqSearch dto, bool trackChanges)
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
            return new PagedList<PersonLabel>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}

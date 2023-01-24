using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPersonLabelRepository : IRepositoryBase<PersonLabel>
    {
        PagedList<PersonLabel> Search(PersonLabelReqSearch dto, bool trackChanges);
    }
}

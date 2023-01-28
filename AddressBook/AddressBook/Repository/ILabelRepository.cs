using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface ILabelRepository : IRepositoryBase<Label>
    {
        PagedList<Label> Search(LabelReqSearch dto, bool trackChanges);
    }
}

using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IPhoneLabelRepository : IRepositoryBase<PhoneLabel>
    {
        PagedList<PhoneLabel> Search(PhoneLabelReqSearch dto, bool trackChanges);
    }
}

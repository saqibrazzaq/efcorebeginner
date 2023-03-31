using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface IEmailLabelRepository : IRepositoryBase<EmailLabel>
    {
        PagedList<EmailLabel> Search(EmailLabelReqSearch dto, bool trackChanges);
    }
}

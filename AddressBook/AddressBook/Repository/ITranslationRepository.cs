using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;

namespace AddressBook.Repository
{
    public interface ITranslationRepository : IRepositoryBase<Translation>
    {
        PagedList<Translation> Search(TranslationReqSearch dto, bool trackChanges);
    }
}

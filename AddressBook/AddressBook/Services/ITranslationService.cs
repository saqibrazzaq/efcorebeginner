using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface ITranslationService
    {
        TranslationRes Create(TranslationReqEdit dto);
        TranslationRes Update(int translationId, TranslationReqEdit dto);
        void Delete(int translationId);
        TranslationRes Get(int translationId);
        int Count();
        int Count(int countryId);
        ApiOkPagedResponse<IEnumerable<TranslationRes>, MetaData>
            Search(TranslationReqSearch dto);
    }
}

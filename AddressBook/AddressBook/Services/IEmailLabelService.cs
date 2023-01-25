using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IEmailLabelService
    {
        EmailLabelRes Create(EmailLabelReqEdit dto);
        EmailLabelRes Update(int emailLabelId, EmailLabelReqEdit dto);
        void Delete(int emailLabelId);
        EmailLabelRes Get(int emailLabelId);
        ApiOkPagedResponse<IEnumerable<EmailLabelRes>, MetaData>
            Search(EmailLabelReqSearch dto);
    }
}

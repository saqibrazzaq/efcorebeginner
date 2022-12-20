using Person.Common.Paging;
using Person.Dtos;

namespace Person.Services
{
    public interface IPersonService
    {
        IEnumerable<PersonRes> GetAll();
        int Count();
        PersonRes Get(int personId);
        PersonRes Create(PersonReqEdit dto);
        PersonRes Update(int personId, PersonReqEdit dto);
        void Delete(int personId);
        ApiOkPagedResponse<IEnumerable<PersonRes>, MetaData>
            Search(PersonReqSearch dto);
    }
}

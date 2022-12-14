using Person.Dtos;

namespace Person.Services
{
    public interface IPersonService
    {
        IEnumerable<PersonRes> GetAll();
        int Count();
        PersonRes Get(int personId);
        PersonRes Create(PersonReqCreate dto);
        PersonRes Update(int personId, PersonReqEdit dto);
        void Delete(int personId);
    }
}

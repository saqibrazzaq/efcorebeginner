using AutoMapper;
using Person.Dtos;
using Person.Repository;

namespace Person.Services
{
    public class PersonService : IPersonService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PersonService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count()
        {
            throw new NotImplementedException();
        }

        public PersonRes Create(PersonReqCreate dto)
        {
            var entity = _mapper.Map<Entities.Person>(dto);
            _repositoryManager.PersonRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonRes>(entity);
        }

        public void Delete(int personId)
        {
            throw new NotImplementedException();
        }

        public PersonRes Get(int personId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<PersonRes> GetAll()
        {
            throw new NotImplementedException();
        }

        public PersonRes Update(int personId, PersonReqEdit person)
        {
            throw new NotImplementedException();
        }
    }
}

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
            var count = _repositoryManager.PersonRepository.FindAll(false)
                .Count();
            return count;
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
            var entity = FindPersonIfExists(personId, true);
            _repositoryManager.PersonRepository.Delete(entity);
            _repositoryManager.Save();
        }

        public PersonRes Get(int personId)
        {
            var entity = FindPersonIfExists(personId, false);
            return _mapper.Map<PersonRes>(entity);
        }

        private Entities.Person FindPersonIfExists(int personId, bool trackChanges)
        {
            var entity = _repositoryManager.PersonRepository.FindByCondition(
                x => x.PersonId == personId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new Exception("No person found with id " + personId);

            return entity;
        }

        public IEnumerable<PersonRes> GetAll()
        {
            var persons = _repositoryManager.PersonRepository.FindAll(
                false);
            return _mapper.Map<IEnumerable<PersonRes>>(persons);
        }

        public PersonRes Update(int personId, PersonReqEdit dto)
        {
            var entity = FindPersonIfExists(personId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PersonRes>(entity);
        }
    }
}

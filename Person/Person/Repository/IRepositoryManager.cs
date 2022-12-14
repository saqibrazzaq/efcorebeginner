namespace Person.Repository
{
    public interface IRepositoryManager
    {
        IPersonRepository PersonRepository { get; }
        void Save();
    }
}

using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace AddressBook.Repository
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> FindAll(bool trackChanges);
        IQueryable<T> FindByCondition(
            Expression<Func<T, bool>> expression,
            bool trackChanges,
            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null
            );
        void Create(T entity);
        void Delete(T entity);
    }
}

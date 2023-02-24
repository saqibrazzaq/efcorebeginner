﻿using AddressBook.Data;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AddressBook.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected AppDbContext _context;

        public RepositoryBase(AppDbContext context)
        {
            _context = context;
        }

        public void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void CreateMany(IEnumerable<T> entities)
        {
            _context.Set<T>().AddRange(entities);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public void DeleteMany(IEnumerable<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
        }

        public IQueryable<T> FindAll(bool trackChanges)
        {
            return !trackChanges ?
              _context.Set<T>()
                .AsNoTracking() :
              _context.Set<T>();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression,
            bool trackChanges,
            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null)
        {
            // Get query
            IQueryable<T> query = _context.Set<T>();

            // Apply filter
            query = query.Where(expression);

            // Include
            if (include != null)
            {
                query = include(query);
            }

            // Tracking
            if (!trackChanges)
                query.AsNoTracking();

            return query;
        }
    }
}

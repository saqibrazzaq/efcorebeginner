using Person.Common.Paging;
using Person.Dtos;
using System.Diagnostics.Metrics;
using System.Linq.Dynamic.Core;

namespace Person.Repository
{
    public static class PersonRepositoryExtensions
    {
        public static IQueryable<Entities.Person> Search(this IQueryable<Entities.Person> items,
            PersonReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.FirstName.Contains(searchParams.SearchText) ||
                    x.LastName.Contains(searchParams.SearchText)
                );
            }

            if (string.IsNullOrWhiteSpace(searchParams.Gender) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Gender == searchParams.Gender);
            }
            return itemsToReturn;
        }
        public static IQueryable<Entities.Person> Sort(this IQueryable<Entities.Person> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.FirstName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Entities.Person>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.FirstName);

            return items.OrderBy(orderQuery);
        }
    }
}

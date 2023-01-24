using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class PersonRepositoryExtensions
    {
        public static IQueryable<Person> Search(this IQueryable<Person> items,
            PersonReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.FirstName.Contains(searchParams.SearchText) ||
                    x.LastName.Contains(searchParams.SearchText) ||
                    x.MiddleName.Contains(searchParams.SearchText) ||
                    x.JobTitle.Contains(searchParams.SearchText) ||
                    x.Company.Contains(searchParams.SearchText) ||
                    x.Department.Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<Person> Sort(this IQueryable<Person> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.FirstName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Person>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.FirstName);

            return items.OrderBy(orderQuery);
        }
    }
}

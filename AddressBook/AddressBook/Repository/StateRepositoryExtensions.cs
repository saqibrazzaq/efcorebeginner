using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class StateRepositoryExtensions
    {
        public static IQueryable<State> Search(this IQueryable<State> items,
            StateReqSearch searchParams)
        {
            var itemsToReturn = items
                .Include(x => x.Country)
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Name.Contains(searchParams.SearchText) ||
                    x.Code.Contains(searchParams.SearchText)
                );
            }

            if (searchParams.CountryId != null)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CountryId == searchParams.CountryId);
            }

            return itemsToReturn;
        }
        public static IQueryable<State> Sort(this IQueryable<State> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<State>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}

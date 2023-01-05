using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class TimezoneRepositoryExtensions
    {
        public static IQueryable<Timezone> Search(this IQueryable<Timezone> items,
            TimezoneReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Name.Contains(searchParams.SearchText) ||
                    x.CityName.Contains(searchParams.SearchText) ||
                    x.Abbreviation.Contains(searchParams.SearchText)
                );
            }

            if (searchParams.CountryId != null)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CountryId == searchParams.CountryId);
            }

            return itemsToReturn;
        }
        public static IQueryable<Timezone> Sort(this IQueryable<Timezone> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Timezone>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}

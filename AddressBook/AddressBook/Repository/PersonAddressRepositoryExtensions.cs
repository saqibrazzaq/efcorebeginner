using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class PersonAddressRepositoryExtensions
    {
        public static IQueryable<PersonAddress> Search(this IQueryable<PersonAddress> items,
            PersonAddressReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Line1.Contains(searchParams.SearchText) ||
                    x.Line2.Contains(searchParams.SearchText) 
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<PersonAddress> Sort(this IQueryable<PersonAddress> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.PersonAddressId);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<PersonAddress>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.PersonAddressId);

            return items.OrderBy(orderQuery);
        }
    }
}

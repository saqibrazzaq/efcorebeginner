using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class ContactAddressRepositoryExtensions
    {
        public static IQueryable<ContactAddress> Search(this IQueryable<ContactAddress> items,
            ContactAddressReqSearch searchParams)
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
        public static IQueryable<ContactAddress> Sort(this IQueryable<ContactAddress> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.ContactAddressId);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<ContactAddress>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.ContactAddressId);

            return items.OrderBy(orderQuery);
        }
    }
}

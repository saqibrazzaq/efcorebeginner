using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class ContactWebsiteRepositoryExtensions
    {
        public static IQueryable<ContactWebsite> Search(this IQueryable<ContactWebsite> items,
            ContactWebsiteReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Website.Contains(searchParams.SearchText) 
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<ContactWebsite> Sort(this IQueryable<ContactWebsite> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.ContactWebsiteId);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<ContactWebsite>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.ContactWebsiteId);

            return items.OrderBy(orderQuery);
        }
    }
}

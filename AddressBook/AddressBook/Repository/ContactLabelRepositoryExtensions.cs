using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class ContactLabelRepositoryExtensions
    {
        public static IQueryable<ContactLabel> Search(this IQueryable<ContactLabel> items,
            ContactLabelReqSearch searchParams)
        {
            var itemsToReturn = items
                .Include(x => x.Label)
                .AsQueryable();

            itemsToReturn = itemsToReturn.Where(x => x.ContactId == searchParams.ContactId);

            return itemsToReturn;
        }
        public static IQueryable<ContactLabel> Sort(this IQueryable<ContactLabel> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Label);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<ContactLabel>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Label);

            return items.OrderBy(orderQuery);
        }
    }
}

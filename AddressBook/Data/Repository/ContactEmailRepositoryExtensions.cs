using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class ContactEmailRepositoryExtensions
    {
        public static IQueryable<ContactEmail> Search(this IQueryable<ContactEmail> items,
            ContactEmailReqSearch searchParams)
        {
            var itemsToReturn = items
                .Include(x => x.EmailLabel)
                .AsQueryable();

            if (searchParams.ContactId != null)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.ContactId == searchParams.ContactId);
            }

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Email.Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<ContactEmail> Sort(this IQueryable<ContactEmail> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Email);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<ContactEmail>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Email);

            return items.OrderBy(orderQuery);
        }
    }
}

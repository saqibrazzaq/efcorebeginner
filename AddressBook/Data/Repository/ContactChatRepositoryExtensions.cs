using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class ContactChatRepositoryExtensions
    {
        public static IQueryable<ContactChat> Search(this IQueryable<ContactChat> items,
            ContactChatReqSearch searchParams)
        {
            var itemsToReturn = items
                .Include(x => x.ChatLabel)
                .AsQueryable();

            if (searchParams.ContactId != null)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.ContactId == searchParams.ContactId);
            }

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Chat.Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<ContactChat> Sort(this IQueryable<ContactChat> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Chat);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<ContactChat>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Chat);

            return items.OrderBy(orderQuery);
        }
    }
}

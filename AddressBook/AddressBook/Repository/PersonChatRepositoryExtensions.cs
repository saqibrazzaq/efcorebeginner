using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class PersonChatRepositoryExtensions
    {
        public static IQueryable<PersonChat> Search(this IQueryable<PersonChat> items,
            PersonChatReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Chat.Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<PersonChat> Sort(this IQueryable<PersonChat> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Chat);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<PersonChat>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Chat);

            return items.OrderBy(orderQuery);
        }
    }
}

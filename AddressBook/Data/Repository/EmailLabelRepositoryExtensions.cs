using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class EmailLabelRepositoryExtensions
    {
        public static IQueryable<EmailLabel> Search(this IQueryable<EmailLabel> items,
            EmailLabelReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Label.Contains(searchParams.SearchText) 
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<EmailLabel> Sort(this IQueryable<EmailLabel> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Label);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<EmailLabel>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Label);

            return items.OrderBy(orderQuery);
        }
    }
}

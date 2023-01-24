using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class PersonPhoneRepositoryExtensions
    {
        public static IQueryable<PersonPhone> Search(this IQueryable<PersonPhone> items,
            PersonPhoneReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Phone.Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<PersonPhone> Sort(this IQueryable<PersonPhone> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Phone);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<PersonPhone>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Phone);

            return items.OrderBy(orderQuery);
        }
    }
}

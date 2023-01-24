using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class PersonLabelRepositoryExtensions
    {
        public static IQueryable<PersonLabel> Search(this IQueryable<PersonLabel> items,
            PersonLabelReqSearch searchParams)
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
        public static IQueryable<PersonLabel> Sort(this IQueryable<PersonLabel> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Label);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<PersonLabel>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Label);

            return items.OrderBy(orderQuery);
        }
    }
}

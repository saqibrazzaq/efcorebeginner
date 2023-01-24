using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class PersonWebsiteRepositoryExtensions
    {
        public static IQueryable<PersonWebsite> Search(this IQueryable<PersonWebsite> items,
            PersonWebsiteReqSearch searchParams)
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
        public static IQueryable<PersonWebsite> Sort(this IQueryable<PersonWebsite> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.PersonWebsiteId);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<PersonWebsite>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.PersonWebsiteId);

            return items.OrderBy(orderQuery);
        }
    }
}

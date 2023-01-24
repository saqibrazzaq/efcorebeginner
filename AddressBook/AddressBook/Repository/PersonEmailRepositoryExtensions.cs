using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class PersonEmailRepositoryExtensions
    {
        public static IQueryable<PersonEmail> Search(this IQueryable<PersonEmail> items,
            PersonEmailReqSearch searchParams)
        {
            var itemsToReturn = items
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Email.Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<PersonEmail> Sort(this IQueryable<PersonEmail> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Email);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<PersonEmail>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Email);

            return items.OrderBy(orderQuery);
        }
    }
}

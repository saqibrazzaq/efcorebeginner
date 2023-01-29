﻿using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class ContactPhoneRepositoryExtensions
    {
        public static IQueryable<ContactPhone> Search(this IQueryable<ContactPhone> items,
            ContactPhoneReqSearch searchParams)
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
        public static IQueryable<ContactPhone> Sort(this IQueryable<ContactPhone> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Phone);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<ContactPhone>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Phone);

            return items.OrderBy(orderQuery);
        }
    }
}
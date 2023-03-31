using AddressBook.Common.Paging;
using AddressBook.Dtos;
using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace AddressBook.Repository
{
    public static class ContactRepositoryExtensions
    {
        public static IQueryable<Contact> Search(this IQueryable<Contact> items,
            ContactReqSearch searchParams)
        {
            var itemsToReturn = items
                .Include(x => x.ContactPhones.Take(1))
                .Include(x => x.ContactEmails.Take(1))
                .AsQueryable();

            if (searchParams.LabelId != null)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.ContactLabels.Any(y => y.LabelId == searchParams.LabelId));
            }

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.FirstName.Contains(searchParams.SearchText) ||
                    x.LastName.Contains(searchParams.SearchText) ||
                    x.MiddleName.Contains(searchParams.SearchText) ||
                    x.JobTitle.Contains(searchParams.SearchText) ||
                    x.Company.Contains(searchParams.SearchText) ||
                    x.Department.Contains(searchParams.SearchText) ||
                    x.ContactPhones.Any(ph => ph.Phone.Contains(searchParams.SearchText)) ||
                    x.ContactEmails.Any(em => em.Email.Contains(searchParams.SearchText)) ||
                    x.ContactChats.Any(ch => ch.Chat.Contains(searchParams.SearchText)) ||
                    x.ContactAddresses.Any(ad => ad.Line1.Contains(searchParams.SearchText) 
                        || ad.Line2.Contains(searchParams.SearchText)
                        || ad.City.Name.Contains(searchParams.SearchText)
                        || ad.City.State.Name.Contains(searchParams.SearchText)
                        || ad.City.State.Country.Name.Contains(searchParams.SearchText)
                        || ad.City.State.Country.iso2.Equals(searchParams.SearchText)
                        || ad.City.State.Country.Iso3.Equals(searchParams.SearchText)
                    )
                );
            }

            return itemsToReturn;
        }
        public static IQueryable<Contact> Sort(this IQueryable<Contact> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.FirstName);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Contact>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.FirstName);

            return items.OrderBy(orderQuery);
        }
    }
}

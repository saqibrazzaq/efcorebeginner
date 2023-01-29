﻿using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactService
    {
        ContactRes Create(ContactReqEdit dto);
        ContactRes Update(int contactId, ContactReqEdit dto);
        void Delete(int contactId);
        ContactRes Get(int contactId);
        ApiOkPagedResponse<IEnumerable<ContactRes>, MetaData>
            Search(ContactReqSearch dto);
    }
}
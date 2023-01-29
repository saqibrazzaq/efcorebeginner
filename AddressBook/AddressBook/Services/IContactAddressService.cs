﻿using AddressBook.Common.Paging;
using AddressBook.Dtos;

namespace AddressBook.Services
{
    public interface IContactAddressService
    {
        ContactAddressRes Create(ContactAddressReqEdit dto);
        ContactAddressRes Update(int contactAddressId, ContactAddressReqEdit dto);
        void Delete(int contactAddressId);
        ContactAddressRes Get(int contactAddressId);
        ApiOkPagedResponse<IEnumerable<ContactAddressRes>, MetaData>
            Search(ContactAddressReqSearch dto);
    }
}

import Common from "../utility/Common";
import { AddressLabelRes } from "./AddressLabel";
import { CityRes } from "./City";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";

export interface ContactAddressRes {
  contactAddressId?: string;
  line1?: string;
  line2?: string;
  postCode?: string;
  cityId?: string;
  city?: CityRes;
  addressLabelId?: string;
  addressLabel?: AddressLabelRes;
  contactId?: string;
  contact?: ContactRes;
}

export class ContactAddressReqEdit {
  line1?: string = "";
  line2?: string = "";
  postCode?: string = "";
  cityId?: string = "";
  addressLabelId?: string = "";
  contactId?: string = "";
  constructor(contactId?: string) {
    this.contactId = contactId;
  }
}

export class ContactAddressReqSearch extends PagedReq {
  contactId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy = "",
      searchText = "",
    }: PagedReq,
    {contactId = ""}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.contactId = contactId;
  }
}
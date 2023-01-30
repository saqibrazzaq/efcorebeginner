import Common from "../utility/Common";
import { AddressLabelRes } from "./AddressLabel";
import { CityRes } from "./City";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";

export interface ContactAddressRes {
  contactAddressId?: number;
  line1?: string;
  line2?: string;
  postCode?: string;
  cityId?: number;
  city?: CityRes;
  addressLabelId?: number;
  addressLabel?: AddressLabelRes;
  contactId?: number;
  contact?: ContactRes;
}

export class ContactAddressReqEdit {
  line1?: string = "";
  line2?: string = "";
  postCode?: string = "";
  cityId?: number = 0;
  addressLabelId?: number = 0;
  contactId?: number = 0;
  constructor(contactId?: number) {
    this.contactId = contactId;
  }
}

export class ContactAddressReqSearch extends PagedReq {
  contactId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
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
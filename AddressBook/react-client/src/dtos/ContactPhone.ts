import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";
import { PhoneLabelRes } from "./PhoneLabel";

export interface ContactPhoneRes {
  contactPhoneId?: string;
  phone?: string;
  countryId?: string;
  country?: CountryRes;
  contactId?: string;
  contact?: ContactRes;
  phoneLabelId?: string;
  phoneLabel?: PhoneLabelRes;
}

export class ContactPhoneReqEdit {
  phone?: string = "";
  countryId?: string = "";
  contactId?: string = "";
  phoneLabelId?: string = "";
  constructor(contactId?: string) {
    this.contactId = contactId;
  }
}

export class ContactPhoneReqSearch extends PagedReq {
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
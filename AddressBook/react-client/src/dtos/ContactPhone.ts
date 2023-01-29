import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";
import { PhoneLabelRes } from "./PhoneLabel";

export interface ContactPhoneRes {
  contactPhoneId?: number;
  phone?: string;
  countryId?: number;
  country?: CountryRes;
  contactId?: number;
  contact?: ContactRes;
  phoneLabelId?: number;
  phoneLabel?: PhoneLabelRes;
}

export class ContactPhoneReqEdit {
  phone?: string;
  countryId?: number = 0;
  contactId?: number = 0;
  phoneLabelId?: number = 0;
}

export class ContactPhoneReqSearch extends PagedReq {
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
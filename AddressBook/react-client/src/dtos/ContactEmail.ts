import Common from "../utility/Common";
import { EmailLabelRes } from "./EmailLabel";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";

export interface ContactEmailRes {
  contactEmailId?: number;
  email?: string;
  contactId?: number;
  contact?: ContactRes;
  emailLabelId?: number;
  emailLabel?: EmailLabelRes;
}

export class ContactEmailReqEdit {
  email?: string = "";
  contactId?: number = 0;
  emailLabelId?: number = 0;
}

export class ContactEmailReqSearch extends PagedReq {
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
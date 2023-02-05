import Common from "../utility/Common";
import { EmailLabelRes } from "./EmailLabel";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";

export interface ContactEmailRes {
  contactEmailId?: string;
  email?: string;
  contactId?: string;
  contact?: ContactRes;
  emailLabelId?: string;
  emailLabel?: EmailLabelRes;
}

export class ContactEmailReqEdit {
  email?: string = "";
  contactId?: string = "";
  emailLabelId?: string = "";
  constructor(contactId?: string) {
    this.contactId = contactId;
  }
}

export class ContactEmailReqSearch extends PagedReq {
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
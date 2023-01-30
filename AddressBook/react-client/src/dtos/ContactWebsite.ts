import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";
import { WebsiteLabelRes } from "./WebsiteLabel";

export interface ContactWebsiteRes {
  contactWebsiteId?: number;
  website?: string;
  contactId?: number;
  contact?: ContactRes;
  websiteLabelId?: number;
  websiteLabel?: WebsiteLabelRes;
}

export class ContactWebsiteReqEdit {
  website?: string = "";
  contactId?: number = 0;
  websiteLabelId?: number = 0;
  constructor(contactId?: number) {
    this.contactId = contactId;
  }
}

export class ContactWebsiteReqSearch extends PagedReq {
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
import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";
import { WebsiteLabelRes } from "./WebsiteLabel";

export interface ContactWebsiteRes {
  contactWebsiteId?: string;
  website?: string;
  contactId?: string;
  contact?: ContactRes;
  websiteLabelId?: string;
  websiteLabel?: WebsiteLabelRes;
}

export class ContactWebsiteReqEdit {
  website?: string = "";
  contactId?: string = "";
  websiteLabelId?: string = "";
  constructor(contactId?: string) {
    this.contactId = contactId;
  }
}

export class ContactWebsiteReqSearch extends PagedReq {
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
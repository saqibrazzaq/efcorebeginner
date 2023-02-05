import Common from "../utility/Common";
import { ChatLabelRes } from "./ChatLabel";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";

export interface ContactChatRes {
  contactChatId?: string;
  chat?: string;
  contactId?: string;
  contact?: ContactRes;
  chatLabelId?: string;
  chatLabel?: ChatLabelRes;
}

export class ContactChatReqEdit {
  chat?: string = "";
  contactId?: string = "";
  chatLabelId?: string = "";
  constructor(contactId?: string) {
    this.contactId = contactId;
  }
}

export class ContactChatReqSearch extends PagedReq {
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
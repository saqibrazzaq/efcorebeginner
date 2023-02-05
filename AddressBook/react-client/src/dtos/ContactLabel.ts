import Common from "../utility/Common";
import { LabelRes } from "./Label";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";

export interface ContactLabelRes {
  contactLabelId?: string;
  labelId?: string;
  label?: LabelRes;
  contactId?: string;
  contact?: ContactRes;
}

export class ContactLabelReqEdit {
  labelId?: string = "";
  contactId?: string = "";
  constructor(contactId?: string) {
    this.contactId = contactId;
  }
}

export class ContactLabelReqSearch extends PagedReq {
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
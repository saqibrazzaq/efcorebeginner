import Common from "../utility/Common";
import { LabelRes } from "./Label";
import { PagedReq } from "./PagedReq";
import { ContactRes } from "./Contact";

export interface ContactLabelRes {
  contactLabelId?: number;
  labelId?: number;
  label?: LabelRes;
  contactId?: number;
  contact?: ContactRes;
}

export class ContactLabelReqEdit {
  labelId?: number = 0;
  contactId?: number = 0;
  constructor(contactId?: number) {
    this.contactId = contactId;
  }
}

export class ContactLabelReqSearch extends PagedReq {
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
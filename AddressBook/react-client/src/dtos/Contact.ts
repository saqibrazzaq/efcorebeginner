import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { ContactAddressRes } from "./ContactAddress";
import { ContactChatRes } from "./ContactChat";
import { ContactEmailRes } from "./ContactEmail";
import { ContactLabelRes } from "./ContactLabel";
import { ContactPhoneRes } from "./ContactPhone";
import { ContactWebsiteRes } from "./ContactWebsite";

export interface ContactRes {
  contactId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  pictureUrl?: string;
  company?: string;
  jobTitle?: string;
  department?: string;
  dateOfBirth?: Date;
  notes?: string;

  contactLabels?: ContactLabelRes[];
  contactEmails?: ContactEmailRes[];
  contactPhones?: ContactPhoneRes[];
  contactAddresses?: ContactAddressRes[];
  contactWebsites?: ContactWebsiteRes[];
  contactChats?: ContactChatRes[];
}

export class ContactReqEdit {
  firstName?: string = "";
  middleName?: string = "";
  lastName?: string = "";
  pictureUrl?: string = "";
  company?: string = "";
  jobTitle?: string = "";
  department?: string = "";
  dateOfBirth?: string = Common.formatDate(new Date());
  notes?: string = "";
}

export class ContactReqSearch extends PagedReq {
  labelId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {labelId = ""}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.labelId = labelId;
  }
}
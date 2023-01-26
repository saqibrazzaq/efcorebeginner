import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { PersonAddressRes } from "./PersonAddress";
import { PersonChatRes } from "./PersonChat";
import { PersonEmailRes } from "./PersonEmail";
import { PersonLabelRes } from "./PersonLabel";
import { PersonPhoneRes } from "./PersonPhone";
import { PersonWebsiteRes } from "./PersonWebsite";

export interface PersonRes {
  personId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  pictureUrl?: string;
  company?: string;
  jobTitle?: string;
  department?: string;
  dateOfBirth?: Date;
  notes?: string;

  personLabels?: PersonLabelRes[];
  personEmails?: PersonEmailRes[];
  personPhones?: PersonPhoneRes[];
  personAddresses?: PersonAddressRes[];
  personWebsites?: PersonWebsiteRes[];
  personChats?: PersonChatRes[];
}

export class PersonEditReq {
  firstName?: string = "";
  middleName?: string = "";
  lastName?: string = "";
  pictureUrl?: string = "";
  company?: string = "";
  jobTitle?: string = "";
  department?: string = "";
  dateOfBirth?: Date = new Date();
  notes?: string = "";
}

export class PersonReqSearch extends PagedReq {
  personLabelId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {personId: personLabelId = ""}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.personLabelId = personLabelId;
  }
}
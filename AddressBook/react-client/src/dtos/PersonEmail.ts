import Common from "../utility/Common";
import { EmailLabelRes } from "./EmailLabel";
import { PagedReq } from "./PagedReq";
import { PersonRes } from "./Person";

export interface PersonEmailRes {
  personEmailId?: number;
  email?: string;
  personId?: number;
  person?: PersonRes;
  emailLabelId?: number;
  emailLabel?: EmailLabelRes;
}

export class PersonEmailReqEdit {
  email?: string = "";
  personId?: number = 0;
  emailLabelId?: number = 0;
}

export class PersonEmailReqSearch extends PagedReq {
  personId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {personId = ""}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.personId = personId;
  }
}
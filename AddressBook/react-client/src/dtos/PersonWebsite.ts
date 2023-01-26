import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { PersonRes } from "./Person";
import { WebsiteLabelRes } from "./WebsiteLabel";

export interface PersonWebsiteRes {
  personWebsiteId?: number;
  website?: string;
  personId?: number;
  person?: PersonRes;
  websiteLabelId?: number;
  websiteLabel?: WebsiteLabelRes;
}

export class PersonWebsiteReqEdit {
  website?: string = "";
  personId?: number = 0;
  websiteLabelId?: number = 0;
}

export class PersonWebsiteReqSearch extends PagedReq {
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
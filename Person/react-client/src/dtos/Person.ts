import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface PersonRes {
  personId?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
}

export class PersonReqEdit {
  firstName?: string = "";
  lastName?: string = "";
  phoneNumber?: string = "";
  gender?: string = "";
}

export class PersonReqSearch extends PagedReq {
  gender?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    { gender = "" }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.gender = gender;
  }
}

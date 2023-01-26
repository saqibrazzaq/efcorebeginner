import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { PersonRes } from "./Person";

export interface PersonLabelRes {
  personLabelId?: number;
  label?: string;
  personId?: number;
  person?: PersonRes;
}

export class PersonLabelReqEdit {
  label?: string = "";
  personId?: number = 0;
}

export class PersonLabelReqSearch extends PagedReq {
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
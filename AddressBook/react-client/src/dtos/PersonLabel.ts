import Common from "../utility/Common";
import { LabelRes } from "./Label";
import { PagedReq } from "./PagedReq";
import { PersonRes } from "./Person";

export interface PersonLabelRes {
  personLabelId?: number;
  labelId?: number;
  label?: LabelRes;
  personId?: number;
  person?: PersonRes;
}

export class PersonLabelReqEdit {
  labelId?: number = 0;
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
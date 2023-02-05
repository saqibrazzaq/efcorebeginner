import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface LabelRes {
  labelId?: string;
  name?: string;
}

export class LabelReqEdit {
  name?: string = "";
}

export class LabelReqSearch extends PagedReq {
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
  }
}
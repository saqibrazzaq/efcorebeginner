import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface EmailLabelRes {
  emailLabelId?: string;
  label?: string;
}

export class EmailLabelReqEdit {
  label?: string = "";
}

export class EmailLabelReqSearch extends PagedReq {
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy = "",
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
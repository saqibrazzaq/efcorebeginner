import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface WebsiteLabelRes {
  websiteLabelId?: number;
  label?: string;
}

export class WebsiteLabelReqEdit {
  label?: string = "";
}

export class WebsiteLabelReqSearch extends PagedReq {
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
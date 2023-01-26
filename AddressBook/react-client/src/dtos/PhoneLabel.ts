import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface PhoneLabelRes {
  phoneLabelId?: number;
  label?: string;
}

export class PhoneLabelReqEdit {
  label?: string = "";
}

export class PhoneLabelReqSearch extends PagedReq {
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
import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface AddressLabelRes {
  addressLabelId?: number;
  label?: string;
}

export class AddressLabelReqEdit {
  label?: string = "";
}

export class AddressLabelReqSearch extends PagedReq {
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
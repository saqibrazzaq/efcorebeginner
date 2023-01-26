import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface ChatLabelRes {
  chatLabelId?: number;
  label?: string;
}

export class ChatLabelReqEdit {
  label?: string = "";
}

export class ChatLabelReqSearch extends PagedReq {
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
import Common from "../utility/Common";

export class PagedReq {
  pageNumber?: number = 1;
  pageSize?: number = Common.DEFAULT_PAGE_SIZE;
  orderBy?: string = "";
  searchText?: string = "";

  constructor({
    pageNumber = 1,
    pageSize = Common.DEFAULT_PAGE_SIZE,
    orderBy,
    searchText = "",
  }: PagedReq) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
    this.searchText = searchText;
  }
}
import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { StateRes } from "./State";

export interface CityRes {
  cityId?: string;
  name?: string;
  latitude?: number;
  longitude?: number;

  stateId?: string;
  state?: StateRes;
}

export class CityReqEdit {
  name?: string = "";
  latitude?: number = 0;
  longitude?: number = 0;

  stateId?: string = "";
  constructor(stateId?: string) {
    this.stateId = stateId;
  }
}

export class CityReqSearch extends PagedReq {
  stateId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {stateId = ""}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.stateId = stateId;
  }
}
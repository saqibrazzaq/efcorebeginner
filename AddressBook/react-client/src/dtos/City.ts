import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { StateRes } from "./State";

export interface CityRes {
  cityId?: number;
  name?: string;
  latitude?: number;
  longitude?: number;

  stateId?: number;
  state?: StateRes;
}

export class CityReqEdit {
  name?: string = "";
  latitude?: number = 0;
  longitude?: number = 0;

  stateId?: number = 0;
  constructor(stateId?: number) {
    this.stateId = stateId;
  }
}

export class CityReqSearch extends PagedReq {
  stateId?: number;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {stateId = undefined}
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
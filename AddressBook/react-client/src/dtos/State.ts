import Common from "../utility/Common";
import { CityRes } from "./City";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";

export interface StateRes {
  stateId?: number;
  name?: string;
  code?: string;
  latitude?: number;
  longitude?: number;

  countryId?: number;
  country?: CountryRes;

  cities?: CityRes[];
}

export class StateReqEdit {
  name?: string = "";
  code?: string = "";
  latitude?: number = 0;
  longitude?: number = 0;

  countryId?: number = 0;
}

export class StateReqSearch extends PagedReq {
  countryId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy = "",
      searchText = "",
    }: PagedReq,
    {countryId = ""}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.countryId = countryId;
  }
}
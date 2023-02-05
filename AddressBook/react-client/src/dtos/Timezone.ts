import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";

export interface TimezoneRes {
  timezoneId?: string;
  name?: string;
  cityName?: string;
  gmtOffset?: number;
  gmtOffsetName?: string;
  abbreviation?: string;

  countryId?: number;
  country?: CountryRes;
}

export class TimezoneReqEdit {
  name?: string = "";
  cityName?: string = "";
  gmtOffset?: number = 0;
  gmtOffsetName?: string = "";
  abbreviation?: string = "";

  countryId?: string = "";
  constructor(countryId?: string) {
    this.countryId = countryId;
  }
}

export class TimezoneReqSearch extends PagedReq {
  countryId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
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
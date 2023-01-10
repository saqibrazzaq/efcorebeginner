import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";

export interface TimezoneRes {
  timezoneId?: number;
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

  countryId?: number = 0;
}

export class TimezoneReqSearch extends PagedReq {
  countryId?: number;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {countryId = undefined}
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
import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";

export interface TranslationRes {
  translationId?: number;
  code?: string;
  name?: string;

  countryId?: number;
  country?: CountryRes;
}

export class TranslationReqEdit {
  code?: string = "";
  name?: string = "";

  countryId?: number = 0;
  constructor(countryId?: number) {
    this.countryId = countryId;
  }
}

export class TranslationReqSearch extends PagedReq {
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
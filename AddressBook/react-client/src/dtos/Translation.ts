import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";

export interface TranslationRes {
  translationId?: string;
  code?: string;
  name?: string;

  countryId?: string;
  country?: CountryRes;
}

export class TranslationReqEdit {
  code?: string = "";
  name?: string = "";

  countryId?: string = "";
  constructor(countryId?: string) {
    this.countryId = countryId;
  }
}

export class TranslationReqSearch extends PagedReq {
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
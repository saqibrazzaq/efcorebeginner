import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { StateRes } from "./State";
import { TimezoneRes } from "./Timezone";
import { TranslationRes } from "./Translation";

export interface CountryRes {
  countryId?: number;
  name?: string;
  iso3?: string;
  iso2?: string;
  numericCode?: string;
  phoneCode?: string;
  capital?: string;
  currency?: string;
  currencyName?: string;
  currencySymbol?: string;
  tld?: string;
  native?: string;
  region?: string;
  subRegion?: string;
  latitude?: number;
  longitude?: number;
  emoji?: string;
  emojiU?: string;

  states?: StateRes[];
  translations?: TranslationRes[];
  timezones?: TimezoneRes[];
}

export class CountryReqEdit {
  name?: string = "";
  iso3?: string = "";
  iso2?: string = "";
  numericCode?: string = "";
  phoneCode?: string = "";
  capital?: string = "";
  currency?: string = "";
  currencyName?: string = "";
  currencySymbol?: string = "";
  tld?: string = "";
  native?: string = "";
  region?: string = "";
  subRegion?: string = "";
  latitude?: number = 0;
  longitude?: number = 0;
  emoji?: string = "";
  emojiU?: string = "";
}

export class CountryReqSearch extends PagedReq {
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

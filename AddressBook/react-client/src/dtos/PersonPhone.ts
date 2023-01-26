import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";
import { PersonRes } from "./Person";
import { PhoneLabelRes } from "./PhoneLabel";

export interface PersonPhoneRes {
  personPhoneId?: number;
  phone?: string;
  countryId?: number;
  country?: CountryRes;
  personId?: number;
  person?: PersonRes;
  phoneLabelId?: number;
  phoneLabel?: PhoneLabelRes;
}

export class PersonPhoneReqEdit {
  phone?: string;
  countryId?: number = 0;
  personId?: number = 0;
  phoneLabelId?: number = 0;
}

export class PersonPhoneReqSearch extends PagedReq {
  personId?: string;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {personId = ""}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.personId = personId;
  }
}
import Common from "../utility/Common";
import { AddressLabelRes } from "./AddressLabel";
import { CityRes } from "./City";
import { PagedReq } from "./PagedReq";
import { PersonRes } from "./Person";

export interface PersonAddressRes {
  personAddressId?: number;
  line1?: string;
  line2?: string;
  postCode?: string;
  cityId?: number;
  city?: CityRes;
  addressLabelId?: number;
  addressLabel?: AddressLabelRes;
  personId?: number;
  person?: PersonRes;
}

export class PersonAddressReqEdit {
  line1?: string = "";
  line2?: string = "";
  postCode?: string = "";
  cityId?: number = 0;
  addressLabelId?: number = 0;
  personId?: number = 0;
}

export class PersonAddressReqSearch extends PagedReq {
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
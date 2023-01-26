import Common from "../utility/Common";
import { ChatLabelRes } from "./ChatLabel";
import { PagedReq } from "./PagedReq";
import { PersonRes } from "./Person";

export interface PersonChatRes {
  personChatId?: number;
  chat?: string;
  personId?: number;
  person?: PersonRes;
  chatLabelId?: number;
  chatLabel?: ChatLabelRes;
}

export class PersonChatReqEdit {
  chat?: string = "";
  personId?: number = 0;
  chatLabelId?: number = 0;
}

export class PersonChatReqSearch extends PagedReq {
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
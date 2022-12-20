export interface PersonRes {
  personId?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
}

export class PersonReqEdit {
  firstName?: string = "";
  lastName?: string = "";
  phoneNumber?: string = "";
  gender?: string = "";
}
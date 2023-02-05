import { ContactPhoneReqEdit, ContactPhoneReqSearch } from "../dtos/ContactPhone";
import { api } from "./axiosconfig"

export const ContactPhoneApi = {
  search: async function (searchParams: ContactPhoneReqSearch) {
    if (!searchParams.contactId || searchParams.contactId == "") return {};
    const response = await api.request({
      url: "/contactPhones/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactPhoneId?: string) {
    if (!contactPhoneId) return {};
    const response = await api.request({
      url: `/contactPhones/` + contactPhoneId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactPhone: ContactPhoneReqEdit) {
    const response = await api.request({
      url: `/contactPhones`,
      method: "POST",
      data: contactPhone,
    })

    return response.data
  },
  update: async function (contactPhoneId?: string, contactPhone?: ContactPhoneReqEdit) {
    await api.request({
      url: `/contactPhones/` + contactPhoneId,
      method: "PUT",
      data: contactPhone,
    })
  },
  delete: async function (contactPhoneId?: string) {
    const response = await api.request({
      url: `/contactPhones/` + contactPhoneId,
      method: "DELETE",
    })

    return response.data
  },
}
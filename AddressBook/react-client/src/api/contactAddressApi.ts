import { ContactAddressReqEdit, ContactAddressReqSearch } from "../dtos/ContactAddress";
import { api } from "./axiosconfig"

export const ContactAddressApi = {
  search: async function (searchParams: ContactAddressReqSearch) {
    if (!searchParams.contactId || searchParams.contactId == "") return {};
    const response = await api.request({
      url: "/contactAddresses/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactAddressId?: string) {
    if (!contactAddressId) return {};
    const response = await api.request({
      url: `/contactAddresses/` + contactAddressId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactAddress: ContactAddressReqEdit) {
    const response = await api.request({
      url: `/contactAddresses`,
      method: "POST",
      data: contactAddress,
    })

    return response.data
  },
  update: async function (contactAddressId?: string, contactAddress?: ContactAddressReqEdit) {
    await api.request({
      url: `/contactAddresses/` + contactAddressId,
      method: "PUT",
      data: contactAddress,
    })
  },
  delete: async function (contactAddressId?: string) {
    const response = await api.request({
      url: `/contactAddresses/` + contactAddressId,
      method: "DELETE",
    })

    return response.data
  },
}
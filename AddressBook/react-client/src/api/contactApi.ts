import { ContactReqEdit, ContactReqSearch } from "../dtos/Contact";
import { api } from "./axiosconfig"

export const ContactApi = {
  search: async function (searchParams: ContactReqSearch) {
    const response = await api.request({
      url: "/contacts/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactId?: string) {
    if (!contactId || contactId == "") return {};
    const response = await api.request({
      url: `/contacts/` + contactId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/contacts/count`,
      method: "GET",
    })

    return response.data
  },
  countAddressesByCityId: async function (cityId?: string) {
    if (!cityId) return {};
    const response = await api.request({
      url: `/contacts/addressCount/` + cityId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contact: ContactReqEdit) {
    const response = await api.request({
      url: `/contacts`,
      method: "POST",
      data: contact,
    })

    return response.data
  },
  update: async function (contactId?: string, contact?: ContactReqEdit) {
    await api.request({
      url: `/contacts/` + contactId,
      method: "PUT",
      data: contact,
    })
  },
  delete: async function (contactId?: string) {
    const response = await api.request({
      url: `/contacts/` + contactId,
      method: "DELETE",
    })

    return response.data
  },
  updateImage: async function (contactId?: string, fd?: FormData) {
    const response = await api.request({
      url: `/contacts/` + contactId,
      method: "POST",
      data: fd,
      
    })

    return response.data
  },
}
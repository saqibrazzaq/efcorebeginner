import { ContactWebsiteReqEdit, ContactWebsiteReqSearch } from "../dtos/ContactWebsite";
import { api } from "./axiosconfig"

export const ContactWebsiteApi = {
  search: async function (searchParams: ContactWebsiteReqSearch) {
    if (!searchParams.contactId || searchParams.contactId == "") return {};
    const response = await api.request({
      url: "/contactWebsites/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactWebsiteId?: string) {
    if (!contactWebsiteId) return {};
    const response = await api.request({
      url: `/contactWebsites/` + contactWebsiteId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactWebsite: ContactWebsiteReqEdit) {
    const response = await api.request({
      url: `/contactWebsites`,
      method: "POST",
      data: contactWebsite,
    })

    return response.data
  },
  update: async function (contactWebsiteId?: string, contactWebsite?: ContactWebsiteReqEdit) {
    await api.request({
      url: `/contactWebsites/` + contactWebsiteId,
      method: "PUT",
      data: contactWebsite,
    })
  },
  delete: async function (contactWebsiteId?: string) {
    const response = await api.request({
      url: `/contactWebsites/` + contactWebsiteId,
      method: "DELETE",
    })

    return response.data
  },
}
import { ContactEmailReqEdit, ContactEmailReqSearch } from "../dtos/ContactEmail";
import { api } from "./axiosconfig"

export const ContactEmailApi = {
  search: async function (searchParams: ContactEmailReqSearch) {
    if (!searchParams.contactId || searchParams.contactId == "") return {};
    const response = await api.request({
      url: "/contactEmails/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactEmailId?: string) {
    if (!contactEmailId) return {};
    const response = await api.request({
      url: `/contactEmails/` + contactEmailId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/contactEmails/count`,
      method: "GET",
    })

    return response.data
  },
  anyEmail: async function (emailLabelId?: string) {
    if (!emailLabelId) return {};
    const response = await api.request({
      url: `/contactEmails/anyEmail/` + emailLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactEmail: ContactEmailReqEdit) {
    const response = await api.request({
      url: `/contactEmails`,
      method: "POST",
      data: contactEmail,
    })

    return response.data
  },
  update: async function (contactEmailId?: string, contactEmail?: ContactEmailReqEdit) {
    await api.request({
      url: `/contactEmails/` + contactEmailId,
      method: "PUT",
      data: contactEmail,
    })
  },
  delete: async function (contactEmailId?: string) {
    const response = await api.request({
      url: `/contactEmails/` + contactEmailId,
      method: "DELETE",
    })

    return response.data
  },
}
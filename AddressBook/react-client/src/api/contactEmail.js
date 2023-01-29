import { api } from "./axiosconfig"

export const ContactEmailApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/contactEmails/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactEmailId) {
    if (!contactEmailId) return {};
    const response = await api.request({
      url: `/contactEmails/` + contactEmailId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactEmail) {
    const response = await api.request({
      url: `/contactEmails`,
      method: "POST",
      data: contactEmail,
    })

    return response.data
  },
  update: async function (contactEmailId, contactEmail) {
    await api.request({
      url: `/contactEmails/` + contactEmailId,
      method: "PUT",
      data: contactEmail,
    })
  },
  delete: async function (contactEmailId) {
    const response = await api.request({
      url: `/contactEmails/` + contactEmailId,
      method: "DELETE",
    })

    return response.data
  },
}
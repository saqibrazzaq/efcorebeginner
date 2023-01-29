import { api } from "./axiosconfig"

export const ContactWebsiteApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/contactWebsites/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactWebsiteId) {
    if (!contactWebsiteId) return {};
    const response = await api.request({
      url: `/contactWebsites/` + contactWebsiteId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactWebsite) {
    const response = await api.request({
      url: `/contactWebsites`,
      method: "POST",
      data: contactWebsite,
    })

    return response.data
  },
  update: async function (contactWebsiteId, contactWebsite) {
    await api.request({
      url: `/contactWebsites/` + contactWebsiteId,
      method: "PUT",
      data: contactWebsite,
    })
  },
  delete: async function (contactWebsiteId) {
    const response = await api.request({
      url: `/contactWebsites/` + contactWebsiteId,
      method: "DELETE",
    })

    return response.data
  },
}
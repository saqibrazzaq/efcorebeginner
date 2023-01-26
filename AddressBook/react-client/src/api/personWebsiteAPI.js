import { api } from "./axiosconfig"

export const PersonWebsiteApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/personWebsites/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (personWebsiteId) {
    if (!personWebsiteId) return {};
    const response = await api.request({
      url: `/personWebsites/` + personWebsiteId,
      method: "GET",
    })

    return response.data
  },
  create: async function (personWebsite) {
    const response = await api.request({
      url: `/personWebsites`,
      method: "POST",
      data: personWebsite,
    })

    return response.data
  },
  update: async function (personWebsiteId, personWebsite) {
    await api.request({
      url: `/personWebsites/` + personWebsiteId,
      method: "PUT",
      data: personWebsite,
    })
  },
  delete: async function (personWebsiteId) {
    const response = await api.request({
      url: `/personWebsites/` + personWebsiteId,
      method: "DELETE",
    })

    return response.data
  },
}
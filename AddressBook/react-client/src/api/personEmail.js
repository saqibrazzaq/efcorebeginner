import { api } from "./axiosconfig"

export const PersonEmailApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/personEmails/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (personEmailId) {
    if (!personEmailId) return {};
    const response = await api.request({
      url: `/personEmails/` + personEmailId,
      method: "GET",
    })

    return response.data
  },
  create: async function (personEmail) {
    const response = await api.request({
      url: `/personEmails`,
      method: "POST",
      data: personEmail,
    })

    return response.data
  },
  update: async function (personEmailId, personEmail) {
    await api.request({
      url: `/personEmails/` + personEmailId,
      method: "PUT",
      data: personEmail,
    })
  },
  delete: async function (personEmailId) {
    const response = await api.request({
      url: `/personEmails/` + personEmailId,
      method: "DELETE",
    })

    return response.data
  },
}
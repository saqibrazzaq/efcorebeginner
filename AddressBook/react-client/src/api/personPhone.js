import { api } from "./axiosconfig"

export const PersonPhoneApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/personPhones/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (personPhoneId) {
    if (!personPhoneId) return {};
    const response = await api.request({
      url: `/personPhones/` + personPhoneId,
      method: "GET",
    })

    return response.data
  },
  create: async function (personPhone) {
    const response = await api.request({
      url: `/personPhones`,
      method: "POST",
      data: personPhone,
    })

    return response.data
  },
  update: async function (personPhoneId, personPhone) {
    await api.request({
      url: `/personPhones/` + personPhoneId,
      method: "PUT",
      data: personPhone,
    })
  },
  delete: async function (personPhoneId) {
    const response = await api.request({
      url: `/personPhones/` + personPhoneId,
      method: "DELETE",
    })

    return response.data
  },
}
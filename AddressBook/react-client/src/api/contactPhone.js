import { api } from "./axiosconfig"

export const ContactPhoneApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/contactPhones/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactPhoneId) {
    if (!contactPhoneId) return {};
    const response = await api.request({
      url: `/contactPhones/` + contactPhoneId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactPhone) {
    const response = await api.request({
      url: `/contactPhones`,
      method: "POST",
      data: contactPhone,
    })

    return response.data
  },
  update: async function (contactPhoneId, contactPhone) {
    await api.request({
      url: `/contactPhones/` + contactPhoneId,
      method: "PUT",
      data: contactPhone,
    })
  },
  delete: async function (contactPhoneId) {
    const response = await api.request({
      url: `/contactPhones/` + contactPhoneId,
      method: "DELETE",
    })

    return response.data
  },
}
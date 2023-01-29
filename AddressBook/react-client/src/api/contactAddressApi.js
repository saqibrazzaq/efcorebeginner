import { api } from "./axiosconfig"

export const ContactAddressApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/contactAddresses/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactAddressId) {
    if (!contactAddressId) return {};
    const response = await api.request({
      url: `/contactAddresses/` + contactAddressId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactAddress) {
    const response = await api.request({
      url: `/contactAddresses`,
      method: "POST",
      data: contactAddress,
    })

    return response.data
  },
  update: async function (contactAddressId, contactAddress) {
    await api.request({
      url: `/contactAddresses/` + contactAddressId,
      method: "PUT",
      data: contactAddress,
    })
  },
  delete: async function (contactAddressId) {
    const response = await api.request({
      url: `/contactAddresses/` + contactAddressId,
      method: "DELETE",
    })

    return response.data
  },
}
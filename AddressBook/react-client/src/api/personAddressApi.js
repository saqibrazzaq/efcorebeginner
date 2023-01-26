import { api } from "./axiosconfig"

export const PersonAddressApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/personAddresses/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (personAddressId) {
    if (!personAddressId) return {};
    const response = await api.request({
      url: `/personAddresses/` + personAddressId,
      method: "GET",
    })

    return response.data
  },
  create: async function (personAddress) {
    const response = await api.request({
      url: `/personAddresses`,
      method: "POST",
      data: personAddress,
    })

    return response.data
  },
  update: async function (personAddressId, personAddress) {
    await api.request({
      url: `/personAddresses/` + personAddressId,
      method: "PUT",
      data: personAddress,
    })
  },
  delete: async function (personAddressId) {
    const response = await api.request({
      url: `/personAddresses/` + personAddressId,
      method: "DELETE",
    })

    return response.data
  },
}
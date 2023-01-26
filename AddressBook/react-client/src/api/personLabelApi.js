import { api } from "./axiosconfig"

export const PersonLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/personLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (countryId) {
    if (!countryId) return {};
    const response = await api.request({
      url: `/personLabels/` + countryId,
      method: "GET",
    })

    return response.data
  },
  create: async function (country) {
    const response = await api.request({
      url: `/personLabels`,
      method: "POST",
      data: country,
    })

    return response.data
  },
  update: async function (countryId, person) {
    await api.request({
      url: `/personLabels/` + countryId,
      method: "PUT",
      data: person,
    })
  },
  delete: async function (countryId) {
    const response = await api.request({
      url: `/personLabels/` + countryId,
      method: "DELETE",
    })

    return response.data
  },
}
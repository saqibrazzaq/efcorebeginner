import { api } from "./axiosconfig"

export const CityApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/cities/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (cityId) {
    if (!cityId) return {};
    const response = await api.request({
      url: `/cities/` + cityId,
      method: "GET",
    })

    return response.data
  },
  create: async function (city) {
    const response = await api.request({
      url: `/cities`,
      method: "POST",
      data: city,
    })

    return response.data
  },
  update: async function (cityId, person) {
    await api.request({
      url: `/cities/` + cityId,
      method: "PUT",
      data: person,
    })
  },
  delete: async function (cityId) {
    const response = await api.request({
      url: `/cities/` + cityId,
      method: "DELETE",
    })

    return response.data
  },
}
import { api } from "./axiosconfig"

export const TimezoneApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/timezones/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (timezoneId) {
    if (!timezoneId) return {};
    const response = await api.request({
      url: `/timezones/` + timezoneId,
      method: "GET",
    })

    return response.data
  },
  create: async function (timezone) {
    const response = await api.request({
      url: `/timezones`,
      method: "POST",
      data: timezone,
    })

    return response.data
  },
  update: async function (timezoneId, person) {
    await api.request({
      url: `/timezones/` + timezoneId,
      method: "PUT",
      data: person,
    })
  },
  delete: async function (timezoneId) {
    const response = await api.request({
      url: `/timezones/` + timezoneId,
      method: "DELETE",
    })

    return response.data
  },
}
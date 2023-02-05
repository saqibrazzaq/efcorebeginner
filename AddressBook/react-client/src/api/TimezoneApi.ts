import { TimezoneReqEdit, TimezoneReqSearch } from "../dtos/Timezone";
import { api } from "./axiosconfig"

export const TimezoneApi = {
  search: async function (searchParams: TimezoneReqSearch) {
    const response = await api.request({
      url: "/timezones/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (timezoneId?: string) {
    if (!timezoneId) return {};
    const response = await api.request({
      url: `/timezones/` + timezoneId,
      method: "GET",
    })

    return response.data
  },
  create: async function (timezone: TimezoneReqEdit) {
    const response = await api.request({
      url: `/timezones`,
      method: "POST",
      data: timezone,
    })

    return response.data
  },
  update: async function (timezoneId?: string, person?: TimezoneReqEdit) {
    await api.request({
      url: `/timezones/` + timezoneId,
      method: "PUT",
      data: person,
    })
  },
  delete: async function (timezoneId?: string) {
    const response = await api.request({
      url: `/timezones/` + timezoneId,
      method: "DELETE",
    })

    return response.data
  },
}
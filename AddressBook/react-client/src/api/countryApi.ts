import { CountryReqEdit, CountryReqSearch } from "../dtos/Country";
import { api } from "./axiosconfig"

export const CountryApi = {
  search: async function (searchParams: CountryReqSearch) {
    const response = await api.request({
      url: "/countries/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (countryId?: string) {
    if (!countryId) return {};
    const response = await api.request({
      url: `/countries/` + countryId,
      method: "GET",
    })

    return response.data
  },
  create: async function (country: CountryReqEdit) {
    const response = await api.request({
      url: `/countries`,
      method: "POST",
      data: country,
    })

    return response.data
  },
  update: async function (countryId?: string, country?: CountryReqEdit) {
    await api.request({
      url: `/countries/` + countryId,
      method: "PUT",
      data: country,
    })
  },
  delete: async function (countryId?: string) {
    const response = await api.request({
      url: `/countries/` + countryId,
      method: "DELETE",
    })

    return response.data
  },
}
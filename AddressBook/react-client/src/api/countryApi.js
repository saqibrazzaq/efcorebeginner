import { api } from "./axiosconfig"

export const countryApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/countries/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
}
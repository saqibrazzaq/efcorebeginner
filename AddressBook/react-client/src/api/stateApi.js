import { api } from "./axiosconfig"

export const StateApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/states/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (stateId) {
    if (!stateId) return {};
    const response = await api.request({
      url: `/states/` + stateId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/states/count`,
      method: "GET",
    })

    return response.data
  },
  countByCountryId: async function (countryId) {
    if (!countryId) return {};
    const response = await api.request({
      url: `/states/count/` + countryId,
      method: "GET",
    })

    return response.data
  },
  create: async function (state) {
    const response = await api.request({
      url: `/states`,
      method: "POST",
      data: state,
    })

    return response.data
  },
  update: async function (stateId, person) {
    await api.request({
      url: `/states/` + stateId,
      method: "PUT",
      data: person,
    })
  },
  delete: async function (stateId) {
    const response = await api.request({
      url: `/states/` + stateId,
      method: "DELETE",
    })

    return response.data
  },
}
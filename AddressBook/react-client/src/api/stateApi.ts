import { StateReqEdit, StateReqSearch } from "../dtos/State";
import { api } from "./axiosconfig"

export const StateApi = {
  search: async function (searchParams: StateReqSearch) {
    const response = await api.request({
      url: "/states/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (stateId?: string) {
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
  countByCountryId: async function (countryId?: string) {
    if (!countryId) return {};
    const response = await api.request({
      url: `/states/count/` + countryId,
      method: "GET",
    })

    return response.data
  },
  create: async function (state: StateReqEdit) {
    const response = await api.request({
      url: `/states`,
      method: "POST",
      data: state,
    })

    return response.data
  },
  update: async function (stateId?: string, state?: StateReqEdit) {
    await api.request({
      url: `/states/` + stateId,
      method: "PUT",
      data: state,
    })
  },
  delete: async function (stateId?: string) {
    const response = await api.request({
      url: `/states/` + stateId,
      method: "DELETE",
    })

    return response.data
  },
}
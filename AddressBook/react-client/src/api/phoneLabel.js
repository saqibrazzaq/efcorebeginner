import { api } from "./axiosconfig"

export const PhoneLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/phoneLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (phoneLabelId) {
    if (!phoneLabelId) return {};
    const response = await api.request({
      url: `/phoneLabels/` + phoneLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (phoneLabel) {
    const response = await api.request({
      url: `/phoneLabels`,
      method: "POST",
      data: phoneLabel,
    })

    return response.data
  },
  update: async function (phoneLabelId, phoneLabel) {
    await api.request({
      url: `/phoneLabels/` + phoneLabelId,
      method: "PUT",
      data: phoneLabel,
    })
  },
  delete: async function (phoneLabelId) {
    const response = await api.request({
      url: `/phoneLabels/` + phoneLabelId,
      method: "DELETE",
    })

    return response.data
  },
}
import { api } from "./axiosconfig"

export const LabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/labels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (labelId) {
    if (!labelId) return {};
    const response = await api.request({
      url: `/labels/` + labelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (label) {
    const response = await api.request({
      url: `/labels`,
      method: "POST",
      data: label,
    })

    return response.data
  },
  update: async function (labelId, label) {
    await api.request({
      url: `/labels/` + labelId,
      method: "PUT",
      data: label,
    })
  },
  delete: async function (labelId) {
    const response = await api.request({
      url: `/labels/` + labelId,
      method: "DELETE",
    })

    return response.data
  },
}
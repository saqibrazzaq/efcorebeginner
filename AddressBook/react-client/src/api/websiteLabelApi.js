import { api } from "./axiosconfig"

export const WebsiteLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/websiteLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (websiteLabelId) {
    if (!websiteLabelId) return {};
    const response = await api.request({
      url: `/websiteLabels/` + websiteLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (websiteLabel) {
    const response = await api.request({
      url: `/websiteLabels`,
      method: "POST",
      data: websiteLabel,
    })

    return response.data
  },
  update: async function (websiteLabelId, websiteLabel) {
    await api.request({
      url: `/websiteLabels/` + websiteLabelId,
      method: "PUT",
      data: websiteLabel,
    })
  },
  delete: async function (websiteLabelId) {
    const response = await api.request({
      url: `/websiteLabels/` + websiteLabelId,
      method: "DELETE",
    })

    return response.data
  },
}
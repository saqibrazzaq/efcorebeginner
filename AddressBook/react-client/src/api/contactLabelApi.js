import { api } from "./axiosconfig"

export const ContactLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/contactLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactLabelId) {
    if (!contactLabelId) return {};
    const response = await api.request({
      url: `/contactLabels/` + contactLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactLabel) {
    const response = await api.request({
      url: `/contactLabels`,
      method: "POST",
      data: contactLabel,
    })

    return response.data
  },
  update: async function (contactLabelId, contactLabel) {
    await api.request({
      url: `/contactLabels/` + contactLabelId,
      method: "PUT",
      data: contactLabel,
    })
  },
  delete: async function (contactLabelId) {
    const response = await api.request({
      url: `/contactLabels/` + contactLabelId,
      method: "DELETE",
    })

    return response.data
  },
}
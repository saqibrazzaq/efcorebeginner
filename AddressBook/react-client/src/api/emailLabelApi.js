import { api } from "./axiosconfig"

export const EmailLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/emailLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (emailLabelId) {
    if (!emailLabelId) return {};
    const response = await api.request({
      url: `/emailLabels/` + emailLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (emailLabel) {
    const response = await api.request({
      url: `/emailLabels`,
      method: "POST",
      data: emailLabel,
    })

    return response.data
  },
  update: async function (emailLabelId, emailLabel) {
    await api.request({
      url: `/emailLabels/` + emailLabelId,
      method: "PUT",
      data: emailLabel,
    })
  },
  delete: async function (emailLabel) {
    const response = await api.request({
      url: `/emailLabels/` + emailLabel,
      method: "DELETE",
    })

    return response.data
  },
}
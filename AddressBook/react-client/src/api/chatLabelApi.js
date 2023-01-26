import { api } from "./axiosconfig"

export const ChatLabelApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/chatLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (chatLabelId) {
    if (!chatLabelId) return {};
    const response = await api.request({
      url: `/chatLabels/` + chatLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (chatLabel) {
    const response = await api.request({
      url: `/chatLabels`,
      method: "POST",
      data: chatLabel,
    })

    return response.data
  },
  update: async function (chatLabelId, chatLabel) {
    await api.request({
      url: `/chatLabels/` + chatLabelId,
      method: "PUT",
      data: chatLabel,
    })
  },
  delete: async function (chatLabelId) {
    const response = await api.request({
      url: `/chatLabels/` + chatLabelId,
      method: "DELETE",
    })

    return response.data
  },
}
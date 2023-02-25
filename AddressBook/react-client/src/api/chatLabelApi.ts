import { ChatLabelReqEdit, ChatLabelReqSearch } from "../dtos/ChatLabel";
import { api } from "./axiosconfig"

export const ChatLabelApi = {
  search: async function (searchParams: ChatLabelReqSearch) {
    const response = await api.request({
      url: "/chatLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (chatLabelId?: string) {
    if (!chatLabelId) return {};
    const response = await api.request({
      url: `/chatLabels/` + chatLabelId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/chatLabels/count`,
      method: "GET",
    })

    return response.data
  },
  create: async function (chatLabel: ChatLabelReqEdit) {
    const response = await api.request({
      url: `/chatLabels`,
      method: "POST",
      data: chatLabel,
    })

    return response.data
  },
  update: async function (chatLabelId?: string, chatLabel?: ChatLabelReqEdit) {
    await api.request({
      url: `/chatLabels/` + chatLabelId,
      method: "PUT",
      data: chatLabel,
    })
  },
  delete: async function (chatLabelId?: string) {
    const response = await api.request({
      url: `/chatLabels/` + chatLabelId,
      method: "DELETE",
    })

    return response.data
  },
}
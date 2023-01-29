import { api } from "./axiosconfig"

export const ContactChatApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/contactChats/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactChatId) {
    if (!contactChatId) return {};
    const response = await api.request({
      url: `/contactChats/` + contactChatId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactChat) {
    const response = await api.request({
      url: `/contactChats`,
      method: "POST",
      data: contactChat,
    })

    return response.data
  },
  update: async function (contactChatId, contactChat) {
    await api.request({
      url: `/contactChats/` + contactChatId,
      method: "PUT",
      data: contactChat,
    })
  },
  delete: async function (contactChatId) {
    const response = await api.request({
      url: `/contactChats/` + contactChatId,
      method: "DELETE",
    })

    return response.data
  },
}
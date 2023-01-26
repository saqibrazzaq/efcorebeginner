import { api } from "./axiosconfig"

export const PersonChatApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/personChats/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (personChatId) {
    if (!personChatId) return {};
    const response = await api.request({
      url: `/personChats/` + personChatId,
      method: "GET",
    })

    return response.data
  },
  create: async function (personChat) {
    const response = await api.request({
      url: `/personChats`,
      method: "POST",
      data: personChat,
    })

    return response.data
  },
  update: async function (personChatId, personChat) {
    await api.request({
      url: `/personChats/` + personChatId,
      method: "PUT",
      data: personChat,
    })
  },
  delete: async function (personChatId) {
    const response = await api.request({
      url: `/personChats/` + personChatId,
      method: "DELETE",
    })

    return response.data
  },
}
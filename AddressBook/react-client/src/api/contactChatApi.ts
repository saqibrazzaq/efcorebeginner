import { ContactChatReqEdit, ContactChatReqSearch } from "../dtos/ContactChat";
import { api } from "./axiosconfig"

export const ContactChatApi = {
  search: async function (searchParams: ContactChatReqSearch) {
    if (!searchParams.contactId || searchParams.contactId == "") return {};
    const response = await api.request({
      url: "/contactChats/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactChatId?: string) {
    if (!contactChatId) return {};
    const response = await api.request({
      url: `/contactChats/` + contactChatId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactChat: ContactChatReqEdit) {
    const response = await api.request({
      url: `/contactChats`,
      method: "POST",
      data: contactChat,
    })

    return response.data
  },
  update: async function (contactChatId?: string, contactChat?: ContactChatReqEdit) {
    await api.request({
      url: `/contactChats/` + contactChatId,
      method: "PUT",
      data: contactChat,
    })
  },
  delete: async function (contactChatId?: string) {
    const response = await api.request({
      url: `/contactChats/` + contactChatId,
      method: "DELETE",
    })

    return response.data
  },
}
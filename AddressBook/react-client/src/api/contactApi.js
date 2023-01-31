import { api } from "./axiosconfig"

export const ContactApi = {
  search: async function (searchParams) {
    const response = await api.request({
      url: "/contacts/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactId) {
    if (!contactId) return {};
    const response = await api.request({
      url: `/contacts/` + contactId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contact) {
    const response = await api.request({
      url: `/contacts`,
      method: "POST",
      data: contact,
    })

    return response.data
  },
  update: async function (contactId, contact) {
    await api.request({
      url: `/contacts/` + contactId,
      method: "PUT",
      data: contact,
    })
  },
  delete: async function (contactId) {
    const response = await api.request({
      url: `/contacts/` + contactId,
      method: "DELETE",
    })

    return response.data
  },
  updateImage: async function (contactId, fd, config) {
    const response = await api.request({
      url: `/contacts/` + contactId,
      method: "POST",
      data: fd,
    }, config)

    return response.data
  },
}
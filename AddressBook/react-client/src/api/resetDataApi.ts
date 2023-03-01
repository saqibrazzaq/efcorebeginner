import { LabelReqEdit, LabelReqSearch } from "../dtos/Label";
import { api } from "./axiosconfig"

export const ResetDataApi = {
  createCountries: async function () {
    const response = await api.request({
      url: `/DataReset/add-countries`,
      method: "POST",
    })

    return response.data
  },
  createContacts: async function () {
    const response = await api.request({
      url: `/DataReset/add-contacts`,
      method: "POST",
    })

    return response.data
  },
  deleteCountries: async function () {
    const response = await api.request({
      url: `/DataReset/delete-countries`,
      method: "DELETE",
    })

    return response.data
  },
  deleteLabels: async function () {
    const response = await api.request({
      url: `/DataReset/delete-labels`,
      method: "DELETE",
    })

    return response.data
  },
  deleteContacts: async function () {
    const response = await api.request({
      url: `/DataReset/delete-contacts`,
      method: "DELETE",
    })

    return response.data
  },
  deleteContactLabels: async function () {
    const response = await api.request({
      url: `/DataReset/delete-contact-labels`,
      method: "DELETE",
    })

    return response.data
  },
  deleteContactEmails: async function () {
    const response = await api.request({
      url: `/DataReset/delete-contact-emails`,
      method: "DELETE",
    })

    return response.data
  },
  deleteContactPhones: async function () {
    const response = await api.request({
      url: `/DataReset/delete-contact-phones`,
      method: "DELETE",
    })

    return response.data
  },
  deleteContactAddresses: async function () {
    const response = await api.request({
      url: `/DataReset/delete-contact-addresses`,
      method: "DELETE",
    })

    return response.data
  },
  deleteContactWebsites: async function () {
    const response = await api.request({
      url: `/DataReset/delete-contact-websites`,
      method: "DELETE",
    })

    return response.data
  },
  deleteContactChats: async function () {
    const response = await api.request({
      url: `/DataReset/delete-contact-chats`,
      method: "DELETE",
    })

    return response.data
  },
}
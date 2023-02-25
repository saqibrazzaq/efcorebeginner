import { ContactLabelReqEdit, ContactLabelReqSearch } from "../dtos/ContactLabel";
import { api } from "./axiosconfig"

export const ContactLabelApi = {
  search: async function (searchParams: ContactLabelReqSearch) {
    if (!searchParams.contactId || searchParams.contactId == "") return {};
    const response = await api.request({
      url: "/contactLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (contactLabelId?: string) {
    if (!contactLabelId) return {};
    const response = await api.request({
      url: `/contactLabels/` + contactLabelId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/contactLabels/count`,
      method: "GET",
    })

    return response.data
  },
  anyContact: async function (labelId?: string) {
    if (!labelId) return {};
    const response = await api.request({
      url: `/contactLabels/anyContact/` + labelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (contactLabel: ContactLabelReqEdit) {
    const response = await api.request({
      url: `/contactLabels`,
      method: "POST",
      data: contactLabel,
    })

    return response.data
  },
  update: async function (contactLabelId?: string, contactLabel?: ContactLabelReqEdit) {
    await api.request({
      url: `/contactLabels/` + contactLabelId,
      method: "PUT",
      data: contactLabel,
    })
  },
  delete: async function (contactLabelId?: string) {
    const response = await api.request({
      url: `/contactLabels/` + contactLabelId,
      method: "DELETE",
    })

    return response.data
  },
}
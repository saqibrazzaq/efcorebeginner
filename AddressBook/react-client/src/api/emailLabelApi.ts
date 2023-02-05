import { EmailLabelReqEdit, EmailLabelReqSearch } from "../dtos/EmailLabel";
import { api } from "./axiosconfig"

export const EmailLabelApi = {
  search: async function (searchParams: EmailLabelReqSearch) {
    const response = await api.request({
      url: "/emailLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (emailLabelId?: string) {
    if (!emailLabelId) return {};
    const response = await api.request({
      url: `/emailLabels/` + emailLabelId,
      method: "GET",
    })

    return response.data
  },
  create: async function (emailLabel: EmailLabelReqEdit) {
    const response = await api.request({
      url: `/emailLabels`,
      method: "POST",
      data: emailLabel,
    })

    return response.data
  },
  update: async function (emailLabelId?: string, emailLabel?: EmailLabelReqEdit) {
    await api.request({
      url: `/emailLabels/` + emailLabelId,
      method: "PUT",
      data: emailLabel,
    })
  },
  delete: async function (emailLabel?: string) {
    const response = await api.request({
      url: `/emailLabels/` + emailLabel,
      method: "DELETE",
    })

    return response.data
  },
}
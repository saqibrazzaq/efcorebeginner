import { PhoneLabelReqEdit, PhoneLabelReqSearch } from "../dtos/PhoneLabel";
import { api } from "./axiosconfig"

export const PhoneLabelApi = {
  search: async function (searchParams: PhoneLabelReqSearch) {
    const response = await api.request({
      url: "/phoneLabels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (phoneLabelId?: string) {
    if (!phoneLabelId) return {};
    const response = await api.request({
      url: `/phoneLabels/` + phoneLabelId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/phoneLabels/count`,
      method: "GET",
    })

    return response.data
  },
  create: async function (phoneLabel: PhoneLabelReqEdit) {
    const response = await api.request({
      url: `/phoneLabels`,
      method: "POST",
      data: phoneLabel,
    })

    return response.data
  },
  update: async function (phoneLabelId?: string, phoneLabel?: PhoneLabelReqEdit) {
    await api.request({
      url: `/phoneLabels/` + phoneLabelId,
      method: "PUT",
      data: phoneLabel,
    })
  },
  delete: async function (phoneLabelId?: string) {
    const response = await api.request({
      url: `/phoneLabels/` + phoneLabelId,
      method: "DELETE",
    })

    return response.data
  },
}
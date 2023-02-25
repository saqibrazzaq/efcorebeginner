import { LabelReqEdit, LabelReqSearch } from "../dtos/Label";
import { api } from "./axiosconfig"

export const LabelApi = {
  search: async function (searchParams: LabelReqSearch) {
    const response = await api.request({
      url: "/labels/search",
      method: "GET",
      params: searchParams,
    })

    return response.data
  },
  get: async function (labelId?: string) {
    if (!labelId) return {};
    const response = await api.request({
      url: `/labels/` + labelId,
      method: "GET",
    })

    return response.data
  },
  count: async function () {
    const response = await api.request({
      url: `/labels/count`,
      method: "GET",
    })

    return response.data
  },
  create: async function (label: LabelReqEdit) {
    const response = await api.request({
      url: `/labels`,
      method: "POST",
      data: label,
    })

    return response.data
  },
  update: async function (labelId?: string, label?: LabelReqEdit) {
    await api.request({
      url: `/labels/` + labelId,
      method: "PUT",
      data: label,
    })
  },
  delete: async function (labelId?: string) {
    const response = await api.request({
      url: `/labels/` + labelId,
      method: "DELETE",
    })

    return response.data
  },
}